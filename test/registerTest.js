import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  ext: {
    loadimpact: {
      projectID: 3640832,
      // Test runs with the same name groups test runs together
      name: 'Registration Load Test'
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    // Ensure that 50% of requests complete within 2000ms
    // and 80% of requests complete within 2500ms
    http_req_duration: ['p(50)<2000', 'p(80)<3000']
  },
  stages: [
    // Ramp up from 0 to 10 VUs over 30 seconds
    { duration: '30s', target: 10 },
    // Ramp up from 10 to 25 VUs over 30 seconds
    { duration: '30s', target: 25 },
    // Ramp up from 25 to 50 VUs over 1 minute
    { duration: '1m', target: 50 },
    // Stay at 50 VUs for 1 minute
    { duration: '1m', target: 50 },
    // Ramp down from 50 to 20 VUs over 30 seconds
    { duration: '30s', target: 20 },
    // Ramp down from 20 to 10 VUs over 30 seconds
    { duration: '30s', target: 10 },
    // Ramp down from 10 to 0 VUs over 30 seconds
    { duration: '30s', target: 0 }
  ]
}
export default function () {
  const url = 'http://178.128.21.253:3030/api/user/register'
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

  const res = http.post(url, payload, params)

  check(res, {
    'status is 200': (r) => r.status === 200,
    'access token is returned': (r) => {
      const body = JSON.parse(r.body)
      return (
        'access_token' in body
      )
    },
    'user is registered': (r) => JSON.parse(r.body).message === 'Register Success!',
    'user data is returned': (r) => {
      const user = JSON.parse(r.body).data
      return (
        'id' in user &&
        'name' in user &&
        'phone' in user &&
        'security_code'
      )
    }
  })

  sleep(1)
}
