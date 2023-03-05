const express = require('express')
const router = express.Router()

const { topup } = require('../../controller/Transaction/Transaction.Controller')
const Auth = require('../../middleware/Auth')

router.post('/top-up', Auth, topup)

module.exports = router
