const { Op } = require('sequelize')
const { Promo } = require('../../models')

exports.show = async (req, res) => {
  const currentDate = new Date()

  const promo = await Promo.findAll({
    where: {
      expired_at: {
        [Op.gte]: currentDate
      }
    }
  })

  res.status(200).json({
    message: 'Promo List',
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
