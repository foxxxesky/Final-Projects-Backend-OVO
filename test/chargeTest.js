import http from 'k6/http'
import { sleep } from 'k6'
// import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.2'] // http errors should be less than 20%
  },
  stages: [
    // { duration: '1m', target: 50 }
    // 50
    { duration: '10s', target: 30 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 50 },
    { duration: '10s', target: 20 }
    // 100 users
    // { duration: '10s', target: 75 },
    // { duration: '20s', target: 100 },
    // { duration: '20s', target: 100 },
    // { duration: '10s', target: 50 }
    // 250
    // { duration: '10s', target: 200 },
    // { duration: '20s', target: 250 },
    // { duration: '20s', target: 250 },
    // { duration: '10s', target: 150 }
    // 400
    // { duration: '10s', target: 350 },
    // { duration: '20s', target: 400 },
    // { duration: '20s', target: 400 },
    // { duration: '10s', target: 300 }
  ]
}

// export function handleSummary (data) {
//   return {
//     charge_test: htmlReport(data)
//   }
// }

export default function () {
  const baseUrl = 'http://visipay.syariif-dev.com/api'
  const url = baseUrl + '/charge'
  const payload = JSON.stringify({
    payment_type: 'bank_transfer',
    bank_transfer: {
      bank: 'bca'
    },
    transaction_details: {
      gross_amount: 1000000
    }
  })

  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYTlmOWRiNDUtMmVmOS00MDcyLWFiMDEtNGYzZmRkYzc2Y2I2IiwibmFtZSI6IlN5YXJpaWYgQWJkIiwiZW1haWwiOiJzeWFyaWkxZkBtYWlsLmNvbSIsInBob25lIjoiNjI4MjE0MDAwMjg1MSJ9LCJpYXQiOjE2ODUzNzk4MDMsImV4cCI6MTY4NTU1MjYwM30.ojwGo6W62Qsy6OHt8hr3pqyCO54tBaxqivV05EyoFGA'

  const params = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }

  http.post(url, payload, params)

  sleep(1)
}
