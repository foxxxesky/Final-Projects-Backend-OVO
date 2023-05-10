'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WalletTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      WalletTransaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user_transaction' })
      WalletTransaction.belongsTo(models.Wallet, { foreignKey: 'wallet_id', as: 'wallet_transaction' })
      WalletTransaction.belongsTo(models.TransactionMethod, { foreignKey: 'transaction_method_id', as: 'transaction_method' })
      WalletTransaction.belongsTo(models.Products, { foreignKey: 'product_id', as: 'transaction_product' })
    }
  }
  WalletTransaction.init({
    user_id: DataTypes.UUID,
    wallet_id: DataTypes.UUID,
    transaction_method_id: DataTypes.UUID,
    product_id: DataTypes.UUID,
    amount: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    transaction_type: DataTypes.ENUM('debit', 'credit'),
    transaction_status: DataTypes.ENUM('pending', 'done', 'failed', 'canceled')
  }, {
    sequelize,
    modelName: 'WalletTransaction',
    tableName: 'wallet_transactions'
  })
  return WalletTransaction
}
