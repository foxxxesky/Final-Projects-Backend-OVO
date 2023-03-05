'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_methods', [
      {
        id: uuid.v4(),
        method_name: 'm-BCA',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'Klik BCA',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'Livin',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'Mandiri Internet',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'Nobu Internet Banking',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BNI Mobile',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BNI iBank Personal',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BRI Mobile',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BRI Internet Banking',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BSI SMS Banking',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BSI Mobile Banking',
        icon: null,
        instruction: 'Lorem Ipsum',
        category: 'Internet / Mobile banking',
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
