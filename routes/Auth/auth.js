const express = require('express')
const { login, user, edit, register, findUser, otp } = require('../../controller/Auth/AuthController')
const Auth = require('../../middleware/Auth')
const router = express.Router()

router.post('/user/register', register)
router.post('/user/login', login)
router.post('/user/otp', otp)
router.get('/user', Auth, user)
router.post('/user', findUser)
router.put('/user', Auth, edit)

module.exports = router
