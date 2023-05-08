const express = require('express')
const { login, user, edit, register } = require('../../controller/Auth/AuthController')
const Auth = require('../../middleware/Auth')
const router = express.Router()

router.post('/user/register', register)
router.post('/user/login', login)
router.get('/user', Auth, user)
router.put('/user', Auth, edit)

module.exports = router
