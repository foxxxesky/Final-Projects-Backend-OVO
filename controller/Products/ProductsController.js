const { Products } = require('../../models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

exports.show = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  const conditions = {}

  if (req.query.category === 'Pulsa') {
    const provider = req.query.phone_number ? req.query.phone_number.substring(0, 5) : decoded.user.phone.substring(0, 5)
    conditions.category = req.query.category

    if (provider === '62821' || provider === '62852' || provider === '62853' || provider === '62811' || provider === '62812' || provider === '62813' || provider === '62822') {
      // Telkomsel
      conditions.code = 'S'
    } else if (provider === '62851') {
      // ByU
      conditions.code = 'SB'
    } else if (provider === '62855' || provider === '62856' || provider === '62857' || provider === '62858' || provider === '62814' || provider === '62815' || provider === '62816') {
      // Indosat
      conditions.code = 'I'
    } else if (provider === '62817' || provider === '62818' || provider === '62819' || provider === '62859' || provider === '62877' || provider === '62878') {
      // XL
      conditions.code = 'X'
    } else if (provider === '62895' || provider === '62896' || provider === '62897' || provider === '62898' || provider === '62899') {
      // Three
      conditions.code = 'T'
    } else if (provider === '62881' || provider === '62882' || provider === '62883' || provider === '62884' || provider === '62885' || provider === '62886' || provider === '62887' || provider === '62888' || provider === '62889') {
      // Smartfren
      conditions.code = 'SM'
    } else if (provider === '62832' || provider === '62833' || provider === '62838') {
      // Axis
      conditions.code = 'AX'
    } else {
      return res.status(400).json({ message: 'Invalid provider number!' })
    }
  }

  if (req.query.category === 'Paket-Data') {
    const provider = req.query.phone_number ? req.query.phone_number.substring(0, 5) : decoded.user.phone.substring(0, 5)
    conditions.category = req.query.category

    if (provider === '62821' || provider === '62852' || provider === '62853' || provider === '62811' || provider === '62812' || provider === '62813' || provider === '62822') {
      // Telkomsel
      conditions.code = 'S'
    } else if (provider === '62851') {
      // ByU
      conditions.code = 'SB'
    } else if (provider === '62855' || provider === '62856' || provider === '62857' || provider === '62858' || provider === '62814' || provider === '62815' || provider === '62816') {
      // Indosat
      conditions.code = 'I'
    } else if (provider === '62817' || provider === '62818' || provider === '62819' || provider === '62859' || provider === '62877' || provider === '62878') {
      // XL
      conditions.code = 'X'
    } else if (provider === '62895' || provider === '62896' || provider === '62897' || provider === '62898' || provider === '62899') {
      // Three
      conditions.code = 'T'
    } else if (provider === '62881' || provider === '62882' || provider === '62883' || provider === '62884' || provider === '62885' || provider === '62886' || provider === '62887' || provider === '62888' || provider === '62889') {
      // Smartfren
      conditions.code = 'SM'
    } else if (provider === '62832' || provider === '62833' || provider === '62838') {
      // Axis
      conditions.code = 'AX'
    } else {
      return res.status(400).json({ message: 'Invalid provider number!' })
    }
  }

  if (req.query.category === 'PLN') {
    if (!req.query.id_pelanggan) {
      return res.status(400).json({ message: 'ID pelanggan tidak ditemukan!' })
    }
    const billType = req.query.id_pelanggan.substring(0, 4)
    conditions.category = req.query.category

    if (billType === '0001') {
      conditions.code = 'TL'
    } else {
      conditions.code = 'L'
    }
  }

  if (req.query.category === 'PDAM') {
    if (!req.query.id_pelanggan) {
      return res.status(400).json({ message: 'ID pelanggan tidak ditemukan!' })
    }

    const billType = req.query.id_pelanggan.substring(0, 4)
    conditions.category = req.query.category

    if (billType === '0002') {
      conditions.code = 'PA'
    } else {
      return res.status(400).json({ message: 'Bill not found!' })
    }
  }

  if (req.query.code) {
    conditions.code = req.query.code
  }

  const products = await Products.findAll({
    where: { ...conditions }
  })

  res.status(200).json({
    message: 'Product List',
    data: products
  })
}

module.exports.detail = async (req, res) => {
  const conditions = {}
  console.log(!conditions)
  if (req.query.id) {
    conditions.id = req.query.id
  }

  if (req.query.name) {
    conditions.name = {
      [Op.like]: `%${req.query.name}%`
    }
  }

  const product = await Products.findOne({
    where: { ...conditions }
  })

  if (!product || Object.keys(conditions).length === 0) {
    return res.status(400).json({ message: 'Product not found!' })
  }

  res.status(200).json({
    message: 'Product Detail',
    data: product
  })
}
