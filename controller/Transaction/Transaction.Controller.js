const { WalletTransaction, Wallet, User, Products, Promo, TransactionMethod } = require('../../models')
const midtransClient = require('midtrans-client')
const Validator = require('fastest-validator')
const { Op } = require('sequelize')
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
      },
      {
        model: Products,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        as: 'transaction_product'
      },
      {
        model: Promo,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        as: 'transaction_discount'
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
    // transaction method
    const method = await TransactionMethod.findOne({ where: { method_name: { [Op.like]: req.body.bank_transfer.bank } } })

    if (!method) {
      req.body.transaction_method_id = null
    } else {
      req.body.transaction_method_id = method.id
    }

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
      expiry_duration: 10, // set to 10 minutes
      unit: 'minute'
    }

    coreApi.charge(req.body)
      .then(async (response) => {
        const payload = {
          id: response.transaction_id,
          user_id: decoded.user.id,
          wallet_id: wallet.id,
          transaction_method_id: req.body.transaction_method_id,
          amount: parseFloat(response.gross_amount),
          notes: req.body.notes,
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
    product_id: 'uuid',
    promo_id: 'uuid|optional'
  }

  const validate = v.validate(req.body, schema)

  if (validate.length) {
    return res.status(400).json(validate)
  }

  try {
    const product = await Products.findOne({ where: { id: req.body.product_id } })
    const promo = await Promo.findOne({ where: { id: req.body.promo_id } })
    const method = await TransactionMethod.findOne({ where: { method_name: 'Visipay Wallet' } })

    if (!product) {
      return res.status(400).json({ message: 'invalid product id' })
    }

    if (!promo) {
      return res.status(400).json({ message: 'invalid promo id' })
    }

    let discount = 0
    if (product.price >= promo.min_order) {
      discount = product.price * promo.discount
      product.price = product.price - discount
    } else {
      req.body.promo_id = null
    }

    if (currentBalance < product.price) {
      return res.status(400).json({
        message: 'insufficient balance!',
        balance: currentBalance
      })
    }

    const transactionPayload = {
      id: uuid.v4(),
      user_id: decoded.user.id,
      wallet_id: wallet.id,
      transaction_method_id: method.id,
      product_id: req.body.product_id || null,
      promo_id: req.body.promo_id || null,
      amount: product.price,
      notes: req.body.notes || null,
      transaction_type: 'credit',
      transaction_status: 'done'
    }

    let newBalance = 0

    if (promo !== null) {
      newBalance = currentBalance - (product.price - discount)
    } else {
      newBalance = currentBalance - product.price
    }

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

exports.method = async (req, res) => {
  const methods = await TransactionMethod.findAll()

  res.status(200).json({
    message: 'Transaction Method List',
    data: methods
  })
}

exports.methodDetail = async (req, res) => {
  const methods = await TransactionMethod.findOne({
    where: { id: req.query.id }
  })

  res.status(200).json({
    message: 'Transaction Method Detail',
    data: methods
  })
}
