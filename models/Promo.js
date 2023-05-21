'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Promo.hasMany(models.WalletTransaction, { foreignKey: 'promo_id', as: 'transaction_discount' })
    }
  }
  Promo.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    discount: DataTypes.DOUBLE,
    min_order: DataTypes.INTEGER,
    expired_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Promo',
    tableName: 'promos'
  })
  return Promo
}
