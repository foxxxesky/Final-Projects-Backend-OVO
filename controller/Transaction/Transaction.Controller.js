const { WalletTransaction } = require('../../models')
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

exports.charge = async (req, res, next) => {
  // const wallet =
  coreApi.charge(req.body)
    .then((response) => {
      // const payload = {
      //   user_id: decoded.
      // }
      res.status(200).json({
        data: response
      })
    })
    .catch((err) => {
      console.log(err.message)
      res.status(200).json({
        data: err.message
      })
    })
}

exports.status = async (req, res) => {
  coreApi.transaction.status(req.query.transaction_id)
    .then((response) => {
      res.status(200).json({
        data: response
      })
    })
    .catch((err) => {
      res.status(200).json({
        data: err.message
      })
    })
}
