'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WalletWithdrawals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      WalletWithdrawals.belongsTo(models.User, { foreignKey: 'user_id', as: 'user_witdrawals' })
      WalletWithdrawals.belongsTo(models.Wallet, { foreignKey: 'wallet_id', as: 'wallet_transaction' })
      WalletWithdrawals.belongsTo(models.TransactionMethod, { foreignKey: 'withdrawal_destination_id', as: 'withdrawals_method' })
    }
  }
  WalletWithdrawals.init({
    user_id: DataTypes.UUID,
    wallet_id: DataTypes.UUID,
    withdrawal_destination_id: DataTypes.UUID,
    amount: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    status: DataTypes.ENUM('pending', 'done', 'failed')
  }, {
    sequelize,
    modelName: 'WalletWithdrawals',
    tableName: 'wallet_withdrawals'
  })
  return WalletWithdrawals
}
