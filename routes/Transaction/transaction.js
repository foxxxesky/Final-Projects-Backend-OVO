const express = require('express')
const router = express.Router()

const { charge, status, show, cancel, payment } = require('../../controller/Transaction/Transaction.Controller')
const Auth = require('../../middleware/Auth')

router.get('/transactions', Auth, show)
router.get('/transaction', Auth, status)
router.post('/transaction', Auth, payment)
router.post('/charge', Auth, charge)
router.post('/transaction/cancel', Auth, cancel)

module.exports = router
