'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_methods', [
      {
        id: uuid.v4(),
        method_name: 'E-Wallet',
        instruction: 'Lorem Ipsum',
        category: 'E-Wallet',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BCA',
        instruction: 'Lorem Ipsum',
        category: 'Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BNI',
        instruction: 'Lorem Ipsum',
        category: 'Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BRI',
        instruction: 'Lorem Ipsum',
        category: 'Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaction_methods', null, {})
  }
}
