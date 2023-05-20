const express = require('express')
const router = express.Router()

const { show, detail } = require('../../controller/Products/ProductsController')
const Auth = require('../../middleware/Auth')

router.get('/products', Auth, show)
router.get('/product', Auth, detail)

module.exports = router
