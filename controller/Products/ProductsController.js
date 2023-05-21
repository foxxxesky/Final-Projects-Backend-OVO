const { Products } = require('../../models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

exports.show = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

  const conditions = {}

  if (req.query.category === 'Pulsa/Paket Data') {
    const provider = decoded.user.phone.substring(0, 4)
    conditions.category = req.query.category

    if (provider === '0821' || provider === '0852' || provider === '0853' || provider === '0811' || provider === '0812' || provider === '0813' || provider === '0822') {
      // Telkomsel
      conditions.code = 'S'
    } else if (provider === '0851') {
      // ByU
      conditions.code = 'SB'
    } else if (provider === '0855' || provider === '0856' || provider === '0857' || provider === '0858' || provider === '0814' || provider === '0815' || provider === '0816') {
      // Indosat
      conditions.code = 'I'
    } else if (provider === '0817' || provider === '0818' || provider === '0819' || provider === '0859' || provider === '0877' || provider === '0878') {
      // XL
      conditions.code = 'X'
    } else if (provider === '0895' || provider === '0896' || provider === '0897' || provider === '0898' || provider === '0899') {
      // Three
      conditions.code = 'T'
    } else if (provider === '0881' || provider === '0882' || provider === '0883' || provider === '0884' || provider === '0885' || provider === '0886' || provider === '0887' || provider === '0888' || provider === '0889') {
      // Smartfren
      conditions.code = 'SM'
    } else if (provider === '0832' || provider === '0833' || provider === '0838') {
      // Axis
      conditions.code = 'AX'
    } else {
      return res.status(400).json({ message: 'Invalid provider number!' })
    }
  }

  if (req.query.category === 'PLN') {
    if (!req.body.id_pelanggan) {
      return res.status(400).json({ message: 'ID pelanggan tidak ditemukan!' })
    }
    const billType = req.body.id_pelanggan.substring(0, 4)
    conditions.category = req.query.category

    if (billType === '0001') {
      conditions.code = 'TL'
    } else {
      conditions.code = 'L'
    }
  }

  if (req.query.category === 'PDAM') {
    if (!req.body.id_pelanggan) {
      return res.status(400).json({ message: 'ID pelanggan tidak ditemukan!' })
    }

    const billType = req.body.id_pelanggan.substring(0, 4)
    conditions.category = req.query.category

    if (billType === '0002') {
      conditions.code = 'PA'
    } else {
      return res.status(400).json({ message: 'Bill not found!' })
    }
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
