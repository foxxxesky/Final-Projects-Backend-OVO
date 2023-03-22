const express = require('express')
const router = express.Router()

const { charge, status } = require('../../controller/Transaction/Transaction.Controller')
const Auth = require('../../middleware/Auth')

router.post('/charge', Auth, charge)
router.get('/transaction', Auth, status)

module.exports = router
