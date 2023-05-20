const express = require('express')
const router = express.Router()

const { show } = require('../../controller/Products/ProductsController')
const Auth = require('../../middleware/Auth')

router.get('/products', Auth, show)

module.exports = router
