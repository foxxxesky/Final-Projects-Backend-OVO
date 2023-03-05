'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('wallet_transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      wallet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'wallets',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      transaction_method_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'transaction_methods',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      transaction_type: {
        type: Sequelize.ENUM('debit', 'credit'),
        allowNull: false
      },
      transaction_status: {
        type: Sequelize.ENUM('pending', 'done', 'failed'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('wallet_transactions')
  }
}
