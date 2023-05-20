'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('promos', [
      {
        id: uuid.v4(),
        name: 'Promo Discount 5%',
        description: 'Minimal Pembelian Rp. 20.000 Untuk Menggunakan Promo ini',
        discount: 0.05,
        min_order: 20000,
        expired_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Set the expiration date to 14 days from now,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Promo Discount 10%',
        description: 'Minimal Pembelian Rp. 50.000 Untuk Menggunakan Promo ini',
        discount: 0.1,
        min_order: 50000,
        expired_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Set the expiration date to 14 days from now,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Promo Discount 20%',
        description: 'Minimal Pembelian Rp. 100.000 Untuk Menggunakan Promo ini',
        discount: 0.2,
        min_order: 100000,
        expired_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Set the expiration date to 14 days from now,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('promos', null, {})
  }
}
