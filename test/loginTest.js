import http from 'k6/http'
import { sleep } from 'k6'
// import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.1'] // http errors should be less than 1%
  },
  stages: [
    // 50
    // { duration: '10s', target: 25 },
    // { duration: '20s', target: 50 },
    // { duration: '20s', target: 50 },
    // { duration: '10s', target: 35 }
    // 100
    // { duration: '10s', target: 50 },
    // { duration: '20s', target: 100 },
    // { duration: '20s', target: 100 },
    // { duration: '10s', target: 75 }
    // 200 users
    // { duration: '10s', target: 100 },
    // { duration: '20s', target: 200 },
    // { duration: '20s', target: 200 },
    // { duration: '10s', target: 150 }
    // 500
    { duration: '10s', target: 300 },
    { duration: '20s', target: 400 },
    { duration: '20s', target: 400 },
    { duration: '10s', target: 350 }
  ]
}

// export function handleSummary (data) {
//   return {
//     charge_test: htmlReport(data)
//   }
// }

export default function () {
  const baseUrl = 'http://visipay.syariif-dev.com/api'
  const url = baseUrl + '/user/login'

  const payload = JSON.stringify({
    phone: '6282140002851',
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
