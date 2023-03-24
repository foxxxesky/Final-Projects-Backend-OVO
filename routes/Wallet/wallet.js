const express = require('express')
const router = express.Router()

const { create, update, show } = require('../../controller/Wallet/WalletController')
const Auth = require('../../middleware/Auth')

router.get('/wallet', Auth, show)
router.post('/wallet', Auth, create)
router.put('/wallet', Auth, update)

module.exports = router
