/* eslint-disable no-undef */
import http from 'k6/http'
import { sleep, check } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  ext: {
    loadimpact: {
      projectID: 3640832,
      // Test runs with the same name groups test runs together
      name: 'Charge Load Test'
    }
  },
  // Smoke tests validate that your script works and that the system performs adequately under minimal load.
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m' // This can be shorter or just a few iterations

  //   thresholds: {
  //     http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  // Ensure that 50% of requests complete within 2000ms
  // and 80% of requests complete within 2500ms
  // http_req_duration: ['p(80)<1500', 'p(95)<3000']
  //     http_req_duration: ['p(80)<1500']
  //   },

}

export function handleSummary (data) {
  return {
    charge_test: htmlReport(data)
  }
}

export default function () {
  const baseUrl = 'http://178.128.21.253:3030/api'
  // Register
  // eslint-disable-next-line no-undef
  const url1 = baseUrl + '/user/register'
  const email = `user${Math.floor(Math.random() * 100000)}@example.com`
  const name = `user_${Math.floor(Math.random() * 100000)}`
  const phone = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`

  const payload1 = JSON.stringify({
    email: `${email}_${Date.now()}@example.com`,
    name,
    phone,
    security_code: 123456
  })

  const params1 = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const res1 = http.post(url1, payload1, params1)
  const accessToken = JSON.parse(res1.body).access_token // set JWT for Charge

  check(res1, {
    'status is 200': (r) => r.status === 200,
    'access token is returned': (r) => {
      const body = JSON.parse(r.body)
      return (
        'access_token' in body
      )
    }
  })

  //   Create Wallet
  const url2 = baseUrl + '/wallet'

  const params2 = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }

  const res2 = http.post(url2, null, params2)
  check(res2, {
    'status is 200': (r) => r.status === 200,
    'wallet created': (r) => JSON.parse(r.body).message === 'Wallet Created!',
    'wallet data is returned': (r) => {
      const wallet = JSON.parse(r.body).data
      return (
        'id' in wallet &&
        'user_id' in wallet &&
        'balance'
      )
    }
  })

  //   Charge
  const url3 = baseUrl + '/charge'
  const payload3 = JSON.stringify({
    payment_type: 'bank_transfer',
    bank_transfer: {
      bank: 'bca'
    },
    transaction_details: {
      gross_amount: 100000
    }
  })

  const params3 = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }

  const res3 = http.post(url3, payload3, params3)

  check(res3, {
    'status is 200': (r) => r.status === 200,
    'midtrans data is returned': (r) => {
      const midtrans = JSON.parse(r.body).midtrans
      return (
        'status_message' in midtrans &&
        'transaction_id' in midtrans &&
        'gross_amount' in midtrans &&
        'payment_type' in midtrans &&
        'transaction_status' in midtrans &&
        'bank' in midtrans.va_numbers[0] &&
        'va_number' in midtrans.va_numbers[0] &&
        'expiry_time'
      )
    },
    'user transaction data is returned': (r) => {
      const midtrans = JSON.parse(r.body).user_transaction
      return (
        'id' in midtrans &&
        'user_id' in midtrans &&
        'wallet_id' in midtrans &&
        'amount' in midtrans &&
        'transaction_type' in midtrans &&
        'transaction_status'
      )
    }
  })

  sleep(1)
}
