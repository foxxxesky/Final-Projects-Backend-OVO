'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transaction_methods', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      method_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      instruction: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('transaction_methods')
  }
}
