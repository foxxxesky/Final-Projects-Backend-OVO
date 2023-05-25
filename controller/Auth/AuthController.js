const Validator = require('fastest-validator')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifyService = process.env.VERIFY_SERVICE
const client = require('twilio')(accountSid, authToken)
const { User } = require('../../models')
const { ACCESS_TOKEN } = process.env
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const v = new Validator()

exports.findUser = async (req, res) => {
  const schema = {
    phone: 'string|unique|min:10'
  }

  const validate = v.validate(req.body, schema)

  if (validate.length) {
    return res.status(400).json(validate)
  }

  const user = await User.findOne({ where: { phone: req.body.phone } })

  if (!user) {
    return res.status(400).json({ message: 'User Not Found!' })
  }

  res.status(200).json({
    message: 'User Found!',
    user
  })
}

exports.register = async (req, res) => {
  const schema = {
    phone: 'string|unique|min:10',
    name: 'string|min:3',
    email: 'email',
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

// otp
exports.otp = async (req, res) => {
  const { identifier, otpChannel } = req.body

  let twilio

  await client.verify.v2.services(verifyService).verifications.create({
    to: '+' + identifier,
    channel: otpChannel
  })
    .then(async (verivication) => {
      twilio = verivication
    })
    .catch((error) => {
      twilio = error
    })

  if (twilio.status === 400 || twilio.status === 404) {
    return res.status(400).json({ message: twilio })
  }

  res.status(200).json({
    message: 'OTP sent successfuly!',
    data: twilio
  })
}

// verify otp
exports.verifyOtp = async (req, res) => {
  const { identifier, otp } = req.body

  let twilio

  await client.verify.v2.services(verifyService).verificationChecks.create({
    to: '+' + identifier,
    code: otp
  })
    .then(async (verification) => {
      twilio = verification
    })
    .catch((error) => {
      twilio = error
    })

  if (twilio.status === 400 || twilio.status === 404) {
    return res.status(400).json({ message: twilio })
  }

  res.status(200).json({
    message: 'Verification success!',
    data: twilio
  })
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
        attributes: ['id', 'name', 'phone', 'email', 'email_verified', 'phone_verified']
      })

      if (user != null) {
        res.json({
          message: 'User login info',
          user
        })
      }
    } catch (error) {
      res.status(400).json({
        message: 'Invalid User!'
      })
    }
  } else {
    res.status(400).json({ message: 'Unauthorized request, a token is required for authentication!' })
  }
}

exports.edit = async (req, res) => {
  if (req.headers.authorization != null) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
      return res.status(400).json({ error: 'Unauthorized Access!' })
    }

    const decode = jwt.verify(token, ACCESS_TOKEN)
    const id = decode.user.id

    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'name', 'phone', 'email', 'email_verified', 'phone_verified']
    })

    try {
      const schema = {
        phone: 'string|unique|min:10|optional',
        name: 'string|min:3|optional',
        email: 'email|optional',
        security_code: 'number|min:6|optional'
      }

      const validate = v.validate(req.body, schema)

      if (validate.length) {
        return res.status(400).json(validate)
      }

      const updatedUser = await user.update(req.body)

      const session = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone
      }

      const accessToken = jwt.sign({
        user: session
      }, ACCESS_TOKEN, { expiresIn: '48h' })

      res.status(200).json({
        message: 'User profile updated!',
        access_token: accessToken,
        data: updatedUser
      })
    } catch (error) {
      res.status(400).json({
        message: 'Invalid User!'
      })
    }
  } else {
    res.status(400).json({ message: 'Unauthorized request, a token is required for authentication!' })
  }
}
