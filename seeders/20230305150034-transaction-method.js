'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_methods', [
      {
        id: uuid.v4(),
        method_name: 'BCA',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BNI',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BRI',
        icon: null,
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
