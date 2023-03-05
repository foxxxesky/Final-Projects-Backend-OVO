const express = require('express')
const router = express.Router()

const { create, update } = require('../../controller/Wallet/WalletController')
const Auth = require('../../middleware/Auth')

router.post('/create', Auth, create)
router.put('/update/:id', Auth, update)

module.exports = router
