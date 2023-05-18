'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      // Axis
      // Indosat
      // Smartfren
      // Telkomsel
      {
        id: uuid.v4(),
        name: 'TELKOMSEL 5K',
        category: 'Pulsa/Paket Data',
        code: 'S',
        price: 5395,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL 10K',
        category: 'Pulsa/Paket Data',
        code: 'S',
        price: 10395,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL 20K',
        category: 'Pulsa/Paket Data',
        code: 'S',
        price: 20095,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL 25K',
        category: 'Pulsa/Paket Data',
        code: 'S',
        price: 24995,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL 50K',
        category: 'Pulsa/Paket Data',
        code: 'S',
        price: 49975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL 100K',
        category: 'Pulsa/Paket Data',
        code: 'S',
        price: 99375,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL 200K',
        category: 'Pulsa/Paket Data',
        code: 'S',
        price: 198975,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Telkomsel By.U
      // Tri
      // XL
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}
