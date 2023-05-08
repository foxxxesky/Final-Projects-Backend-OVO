const Validator = require('fastest-validator')
const { User } = require('../../models')
const { ACCESS_TOKEN } = process.env
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const v = new Validator()

exports.register = async (req, res) => {
  const schema = {
    phone: 'string|unique|min:10',
    name: 'string|min:3|optional',
    email: 'email|optional',
    security_code: 'number|min:6'
  }

  const validate = v.validate(req.body, schema)
  const { name, email, phone, security_code: securityCode } = req.body

  if (validate.length) {
    return res.status(400).json(validate)
  }

  try {
    req.body.id = uuid.v4()
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(String(securityCode), salt)
    req.body.security_code = hash

    const user = await User.create(req.body)

    const session = {
      id: req.body.id,
      name,
      email,
      phone
    }

    const accessToken = jwt.sign({
      user: session
    }, ACCESS_TOKEN, { expiresIn: '48h' })

    res.status(200).json({
      message: 'Register Success!',
      access_token: accessToken,
      data: user
    })
  } catch (error) {
    res.status(400).json({ message: 'Email or Phone Already Registered!' })
  }
}

exports.login = async (req, res) => {
  const schema = {
    phone: 'string|unique|min:10',
    security_code: 'number|min:6'
  }

  const validate = v.validate(req.body, schema)

  if (validate.length) {
    return res.status(400).json(validate)
  }

  try {
    const user = await User.findOne({ where: { phone: req.body.phone } })

    const checkPass = bcrypt.compareSync(String(req.body.security_code), user.security_code)

    if (!checkPass) {
      return res.status(400).json({ message: 'Login failed!' })
    }

    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }

    const accessToken = jwt.sign({
      user: session
    }, ACCESS_TOKEN, { expiresIn: '48h' })

    res.status(200).json({
      message: 'Login Success!',
      access_token: accessToken,
      data: user
    })
  } catch (error) {
    res.status(400).json({ message: 'User not found!' })
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
        attributes: ['id', 'name', 'phone', 'email', 'photo', 'email_verified', 'phone_verified']
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
    res.status(400).json({ message: 'Unauthorized request, a token is required for authentication!' })
  }
}

exports.edit = async (req, res) => {
  const id = req.query.id

  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'name', 'phone', 'email', 'photo']
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found!' })
  }

  try {
    const schema = {
      name: 'string|optional|min:3',
      phone: 'string|optional|min:10|unique',
      email: 'string|email|optional|unique',
      photo: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
      return res.status(400).json(validate)
    }

    await user.update(req.body)
    res.status(200).json({
      message: 'Data successfuly updated!',
      data: user
    })
  } catch (error) {
    res.status(400).json(error)
  }
}
