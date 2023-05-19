const { WalletTransaction, Wallet, User, Products, TransactionMethod } = require('../../models')
const midtransClient = require('midtrans-client')
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const v = new Validator()

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY
})

exports.show = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  const conditions = {}
  if (req.query.transaction_status) {
    conditions.transaction_status = req.query.transaction_status
  }

  if (req.query.transaction_type) {
    conditions.transaction_type = req.query.transaction_type
  }

  const transaction = await WalletTransaction.findAll({
    where: { user_id: decoded.user.id, ...conditions },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['security_code', 'email_verified', 'phone_verified', 'createdAt', 'updatedAt']
        },
        as: 'user_transaction'
      },
      {
        model: Wallet,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        as: 'wallet_transaction'
      },
      {
        model: TransactionMethod,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        as: 'transaction_method'
      }
    ]
  })

  res.status(200).json({
    message: 'Transaction List',
    data: transaction
  })
}

exports.charge = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  const wallet = await Wallet.findOne({ where: { user_id: decoded.user.id } })
  if (!wallet) {
    return res.status(400).json({ message: 'wallet not found!' })
  }

  try {
    // transaction
    req.body.transaction_details.order_id = uuid.v4()

    // customer
    req.body.customer_details = {
      first_name: decoded.user.name,
      phone: decoded.user.phone,
      email: decoded.user.email
    }

    // custom expiry
    req.body.custom_expiry = {
      expiry_duration: 5, // set to 5 minutes
      unit: 'minute'
    }

    coreApi.charge(req.body)
      .then(async (response) => {
        const payload = {
          id: response.transaction_id,
          user_id: decoded.user.id,
          wallet_id: wallet.id,
          transaction_method_id: null,
          amount: parseFloat(response.gross_amount),
          notes: null,
          transaction_type: 'debit',
          transaction_status: response.transaction_status
        }

        const transaction = await WalletTransaction.create(payload)

        res.status(200).json({
          midtrans: response,
          user_transaction: transaction
        })
      })
      .catch((err) => {
        console.log(err.message)
        res.status(200).json({
          data: err.message
        })
      })
  } catch (error) {
    return res.status(400).json({ message: 'there is an error!' })
  }
}

exports.status = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  const wallet = await Wallet.findOne({ where: { user_id: decoded.user.id } })

  if (!wallet) {
    return res.status(400).json({ message: 'wallet not found!' })
  }

  const previousAmount = wallet.balance

  const userTransaction = await WalletTransaction.findOne({ where: { id: req.query.transaction_id } })

  try {
    coreApi.transaction.status(req.query.transaction_id)
      .then(async (response) => {
        const transactionStatus = response.transaction_status

        if (transactionStatus === 'pending') {
          const payload = {
            transaction_status: response.transaction_status
          }
          await userTransaction.update(payload)
        } else if (transactionStatus === 'settlement') {
          const transactionPayload = {
            transaction_status: 'done'
          }

          const newAmount = previousAmount + parseFloat(response.gross_amount)

          const walletPayload = {
            balance: newAmount
          }

          await userTransaction.update(transactionPayload)
          await wallet.update(walletPayload)
        } else if (transactionStatus === 'expire') {
          const payload = {
            transaction_status: 'failed'
          }

          await userTransaction.update(payload)
        }

        res.status(200).json({
          midtrans: response,
          user_transaction: userTransaction
        })
      })
      .catch((err) => {
        res.status(400).json({
          data: err.message
        })
      })
  } catch (error) {
    return res.status(400).json({ message: 'there is an error!' })
  }
}

exports.cancel = async (req, res) => {
  try {
    const userTransaction = await WalletTransaction.findOne({ where: { id: req.query.transaction_id } })
    coreApi.transaction.cancel(req.query.transaction_id)
      .then(async (response) => {
        const payload = {
          transaction_status: 'canceled'
        }
        userTransaction.update(payload)

        res.status(200).json({
          midtrans: response,
          user_transaction: userTransaction
        })
      })
      .catch((err) => {
        res.status(200).json({
          data: err.message
        })
      })
  } catch (error) {
    return res.status(400).json({ message: 'there is an error!' })
  }
}

exports.payment = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  const wallet = await Wallet.findOne({ where: { user_id: decoded.user.id } })
  const currentBalance = wallet.balance

  const schema = {
    product_id: 'uuid'
  }

  const validate = v.validate(req.body, schema)
  if (validate.length) {
    return res.status(400).json(validate)
  }

  const product = await Products.findOne({ where: { id: req.body.product_id } })
  // res.json(product)

  if (currentBalance < product.price) {
    return res.status(400).json({
      message: 'insufficient balance!',
      balance: currentBalance
    })
  }

  try {
    const transactionPayload = {
      id: uuid.v4(),
      user_id: decoded.user.id,
      wallet_id: wallet.id,
      transaction_method_id: null,
      product_id: req.body.product_id || null,
      amount: product.price,
      notes: req.body.notes || null,
      transaction_type: 'credit',
      transaction_status: 'done'
    }

    const newBalance = currentBalance - product.price
    const walletPayload = {
      balance: newBalance
    }

    const transaction = await WalletTransaction.create(transactionPayload)
    await wallet.update(walletPayload)

    res.status(200).json({
      message: 'Transaction Success',
      data: transaction
    })
  } catch (error) {
    res.status(400).json(error)
  }
}
