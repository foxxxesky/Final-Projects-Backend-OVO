import http from 'k6/http'
import { sleep } from 'k6'
// import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.2'] // http errors should be less than 1%
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
    // 400
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
  const url = baseUrl + '/promos'

  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDA3ZjE3NmUtYTU1MS00NzQyLWFkYjktZjNiNGIxOTE1ZDVhIiwibmFtZSI6IlN5YXJpaWYgQWJkIiwiZW1haWwiOiJzeWFyaWkxZkBtYWlsLmNvbSIsInBob25lIjoiNjI4MjE0MDAwMjg1MSJ9LCJpYXQiOjE2ODUxMTM3OTAsImV4cCI6MTY4NTI4NjU5MH0.3__ZWHx0S7Nm5nssRrFuQd2zBwyf0hG4MQxYazU9IW0'

  const params = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }

  http.get(url, params)

  sleep(1)
}
