const { Wallet, User } = require('../../models')
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const v = new Validator()

exports.show = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  const wallet = await Wallet.findOne({
    where: { user_id: decoded.user.id },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['security_code', 'phone_verified', 'createdAt', 'updatedAt']
        },
        as: 'user_wallet'
      }
    ]
  })

  if (!wallet) {
    return res.status(400).json({
      message: 'Wallet not found!'
    })
  }

  res.status(200).json({
    message: 'Wallet Info',
    data: wallet
  })
}

exports.create = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  try {
    const [wallet, created] = await Wallet.findOrCreate({
      where: { user_id: decoded.user.id },
      attributes: ['id', 'user_id', 'balance'],
      defaults: {
        id: uuid.v4(),
        user_id: decoded.user.id,
        balance: 0
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['security_code', 'phone_verified', 'createdAt', 'updatedAt']
          },
          as: 'user_wallet'
        }
      ]
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
  const id = req.query.id

  const wallet = await Wallet.findOne({
    where: { id },
    attributes: {
      exclude: ['createdAt']
    }
  })

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
