const express = require('express')
const router = express.Router()

const { charge, status, show } = require('../../controller/Transaction/Transaction.Controller')
const Auth = require('../../middleware/Auth')

router.get('/transactions', Auth, show)
router.get('/transaction', Auth, status)
router.post('/charge', Auth, charge)

module.exports = router
