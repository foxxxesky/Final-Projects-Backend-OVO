const { User } = require('../models')
const Validator = require('fastest-validator')
const { ACCESS_TOKEN } = process.env
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const v = new Validator()

exports.login = async (req, res) => {
  const phone = req.body.phone

  const schema = {
    phone: 'string|unique|min:10'
  }

  const validate = v.validate(req.body, schema)

  if (validate.length) {
    return res.status(400).json(validate)
  }

  const userData = await User.findOne({ where: { phone } })

  if (!userData) {
    req.body.id = uuid.v4()

    const accessToken = jwt.sign({
      user: { phone }
    }, ACCESS_TOKEN, { expiresIn: '6h' })

    await User.create(req.body)

    const activeUser = await User.findOne({
      where: { phone },
      attributes: ['id', 'name', 'phone', 'email', 'photo', 'security_code']
    })

    res.status(200).json({
      message: 'Register Success!',
      access_token: accessToken,
      user: activeUser
    })
  } else {
    const accessToken = jwt.sign({
      user: { phone: userData.phone }
    }, ACCESS_TOKEN, { expiresIn: '6h' })

    const activeUser = await User.findOne({
      where: { phone: userData.phone },
      attributes: ['id', 'name', 'phone', 'email', 'photo']
    })

    res.status(200).json({
      message: 'Login Success!',
      access_token: accessToken,
      user: activeUser
    })
  }
}

exports.user = async (req, res) => {
  if (req.headers.authorization != null) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
      return res.status(400).json({ error: 'Unauthorized Access!' })
    }

    try {
      const decode = jwt.verify(token, ACCESS_TOKEN)
      const phone = decode.user.phone
      const user = await User.findOne({
        where: { phone },
        attributes: ['id', 'name', 'phone', 'email', 'photo']
      })

      if (user != null) {
        res.json({
          message: 'User login info',
          user
        })
      }
    } catch (error) {
      res.status(400).json({
        message: 'Invalid token!'
      })
    }
  } else {
    res.status(400).json({ message: 'Unauthorized request, a token is required for authentication' })
  }
}
