const express = require('express')
const { login, user } = require('../../controller/AuthController')
const Auth = require('../../middleware/Auth')
const router = express.Router()

router.post('/login', login)
router.get('/user', Auth, user)

module.exports = router
