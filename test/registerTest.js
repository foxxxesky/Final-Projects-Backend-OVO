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
    // { duration: '10s', target: 30 },
    // { duration: '20s', target: 50 },
    // { duration: '20s', target: 50 },
    // { duration: '10s', target: 20 }
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
  const url = baseUrl + '/user/register'
  const email = `user${Math.floor(Math.random() * 100000)}@example.com`
  const name = `user_${Math.floor(Math.random() * 100000)}`
  const phone = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`

  const payload = JSON.stringify({
    email: `${email}_${Date.now()}@example.com`,
    name,
    phone,
    security_code: 123456
  })

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  http.post(url, payload, params)
  sleep(1)
}