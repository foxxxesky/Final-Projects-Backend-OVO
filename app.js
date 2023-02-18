const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const router = express.Router()
const cors = require('cors')

const authRouter = require('./routes/Auth/auth')
const walletRouter = require('./routes/Wallet/wallet')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Auth
router.use('/auth', authRouter)

// Wallet
router.use('/wallet', walletRouter)

app.use('/api', router)

module.exports = app
