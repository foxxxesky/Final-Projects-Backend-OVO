import http from 'k6/http'
import { sleep } from 'k6'
// import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  thresholds: {
    http_req_failed: ['rate<1.0'] // http errors should be less than 1%
  },
  stages: [
    // 50
    { duration: '10s', target: 25 },
    { duration: '40s', target: 50 },
    { duration: '10s', target: 35 }
    // 100
    // { duration: '10s', target: 50 },
    // { duration: '40s', target: 100 },
    // { duration: '10s', target: 75 },
    // 200 users
    // { duration: '10s', target: 100 },
    // { duration: '40s', target: 200 },
    // { duration: '10s', target: 150 },
    // 500
    // { duration: '10s', target: 350 },
    // { duration: '40s', target: 500 },
    // { duration: '10s', target: 250 }
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