const { Promo } = require('../../models')

exports.show = async (req, res) => {
  const promo = await Promo.findAll()

  res.status(200).json({
    message: 'Product List',
    data: promo
  })
}

module.exports.detail = async (req, res) => {
  const conditions = {}

  if (req.query.id) {
    conditions.id = req.query.id
  }

  const promo = await Promo.findOne({
    where: { ...conditions }
  })

  if (!promo || Object.keys(conditions).length === 0) {
    return res.status(400).json({ message: 'Promo not found!' })
  }

  res.status(200).json({
    message: 'Promo Detail',
    data: promo
  })
}
