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
      // Telkomsel By.U
      // Tri
      // XL
      {
        id: uuid.v4(),
        name: '',
        category: 'Pulsa/Paket Data',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}
