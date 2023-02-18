const express = require('express')
const { login, user, edit } = require('../../controller/AuthController')
const Auth = require('../../middleware/Auth')
const router = express.Router()

router.post('/login', login)
router.get('/user', Auth, user)
router.put('/edit/:id', Auth, edit)

module.exports = router
