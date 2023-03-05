const Validator = require('fastest-validator')
const { Wallet } = require('../models')
const uuid = require('uuid')
const v = new Validator()

exports.create = async (req, res) => {
  const schema = {
    user_id: 'uuid',
    balance: 'number'
  }

  const validate = v.validate(req.body, schema)
  const { user_id: userID } = req.body

  if (validate.length) {
    return res.status(400).json(validate)
  }

  try {
    const [wallet, created] = await Wallet.findOrCreate({
      where: { user_id: userID },
      attributes: ['id', 'user_id', 'balance'],
      defaults: {
        id: uuid.v4(),
        user_id: userID,
        balance: 0
      }
    })

    if (created) {
      res.status(200).json({
        message: 'Wallet Created!', data: wallet
      })
    } else {
      res.status(200).json({
        message: 'User Already have wallet registered!',
        data: wallet
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Failed',
      error
    })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  const wallet = await Wallet.findOne({ where: { id } })

  if (!wallet) {
    return res.status(400).json({ message: 'Wallet not found!' })
  }

  try {
    const schema = {
      user_id: 'uuid',
      balance: 'number'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
      res.status(400).json(validate)
    }

    await wallet.update(req.body)
    res.status(200).json({
      message: 'Wallet updated!',
      data: wallet
    })
  } catch (error) {
    res.status(400).json(error)
  }
}
