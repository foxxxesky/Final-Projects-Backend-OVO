'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Wallet.belongsTo(models.User, { foreignKey: 'user_id', as: 'user_wallet' })
    }
  }
  Wallet.init({
    user_id: DataTypes.UUID,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wallet',
    tableName: 'wallets'
  })
  return Wallet
}
