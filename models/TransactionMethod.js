'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TransactionMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      TransactionMethod.hasMany(models.WalletTransaction, { foreignKey: 'id', as: 'transaction_method' })
    }
  }
  TransactionMethod.init({
    method_name: DataTypes.STRING,
    icon: DataTypes.STRING,
    instruction: DataTypes.TEXT,
    category: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TransactionMethod',
    tableName: 'transaction_methods'
  })
  return TransactionMethod
}
