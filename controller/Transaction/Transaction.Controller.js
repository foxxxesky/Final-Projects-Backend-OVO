const Validator = require('fastest-validator')
const { WalletTransaction } = require('../../models')
const uuid = require('uuid')
const v = new Validator()

exports.topup = async (req, res) => {
  try {
    const schema = {
      user_id: 'uuid',
      wallet_id: 'uuid',
      transaction_method_id: 'uuid',
      amount: 'number',
      notes: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
      return res.status(400).json(validate)
    }

    req.body.id = uuid.v4()
    const transaction = await WalletTransaction.create(req.body)
    res.status(200).json({ message: 'Transaction Success!', data: transaction })
  } catch (error) {
    res.status(400).json(error)
  }
}
