'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      // PLN TOKEN
      {
        id: uuid.v4(),
        name: 'Token Listrik 20.000',
        category: 'PLN',
        code: 'TL',
        price: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Token Listrik 50.000',
        category: 'PLN',
        code: 'TL',
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Token Listrik 100.000',
        category: 'PLN',
        code: 'TL',
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Token Listrik 200.000',
        category: 'PLN',
        code: 'TL',
        price: 200000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Token Listrik 500.000',
        category: 'PLN',
        code: 'TL',
        price: 500000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // PLN TAGIHAN
      {
        id: uuid.v4(),
        name: 'Tagihan Listrik',
        category: 'PLN',
        code: 'L',
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // PDAM
      {
        id: uuid.v4(),
        name: 'Tagihan PDAM',
        category: 'PDAM',
        code: 'PA',
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Axis
      {
        id: uuid.v4(),
        name: 'AXIS 5K',
        category: 'Pulsa/Paket Data',
        code: 'AX',
        price: 5975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'AXIS 10K',
        category: 'Pulsa/Paket Data',
        code: 'AX',
        price: 10975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'AXIS 25K',
        category: 'Pulsa/Paket Data',
        code: 'AX',
        price: 25050,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'AXIS 50K',
        category: 'Pulsa/Paket Data',
        code: 'AX',
        price: 49975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'AXIS 100K',
        category: 'Pulsa/Paket Data',
        code: 'AX',
        price: 98725,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'AXIS 200K',
        category: 'Pulsa/Paket Data',
        code: 'AX',
        price: 199000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Indosat
      {
        id: uuid.v4(),
        name: 'INDOSAT 5K',
        category: 'Pulsa/Paket Data',
        code: 'I',
        price: 5795,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'INDOSAT 10K',
        category: 'Pulsa/Paket Data',
        code: 'I',
        price: 10695,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'INDOSAT 20K',
        category: 'Pulsa/Paket Data',
        code: 'I',
        price: 19895,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'INDOSAT 25K',
        category: 'Pulsa/Paket Data',
        code: 'I',
        price: 24775,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'INDOSAT 50K',
        category: 'Pulsa/Paket Data',
        code: 'I',
        price: 48875,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'INDOSAT 100K',
        category: 'Pulsa/Paket Data',
        code: 'I',
        price: 97975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'INDOSAT 200K',
        category: 'Pulsa/Paket Data',
        code: 'I',
        price: 189975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Smartfren
      {
        id: uuid.v4(),
        name: 'SMARTFREN 5K',
        category: 'Pulsa/Paket Data',
        code: 'SM',
        price: 5095,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'SMARTFREN 10K',
        category: 'Pulsa/Paket Data',
        code: 'SM',
        price: 9975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'SMARTFREN 20K',
        category: 'Pulsa/Paket Data',
        code: 'SM',
        price: 19800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'SMARTFREN 25K',
        category: 'Pulsa/Paket Data',
        code: 'SM',
        price: 24585,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'SMARTFREN 50K',
        category: 'Pulsa/Paket Data',
        code: 'SM',
        price: 48965,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'SMARTFREN 100K',
        category: 'Pulsa/Paket Data',
        code: 'SM',
        price: 98900,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'SMARTFREN 200K',
        category: 'Pulsa/Paket Data',
        code: 'SM',
        price: 199575,
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
      },
      // Telkomsel By.U
      {
        id: uuid.v4(),
        name: 'TELKOMSEL BY.U 5K',
        category: 'Pulsa/Paket Data',
        code: 'SB',
        price: 5795,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL BY.U 10K',
        category: 'Pulsa/Paket Data',
        code: 'SB',
        price: 10595,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL BY.U 20K',
        category: 'Pulsa/Paket Data',
        code: 'SB',
        price: 20395,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL BY.U 25K',
        category: 'Pulsa/Paket Data',
        code: 'SB',
        price: 25395,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL BY.U 50K',
        category: 'Pulsa/Paket Data',
        code: 'SB',
        price: 50395,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TELKOMSEL BY.U 100K',
        category: 'Pulsa/Paket Data',
        code: 'SB',
        price: 100475,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Tri
      {
        id: uuid.v4(),
        name: 'TRI 5K',
        category: 'Pulsa/Paket Data',
        code: 'T',
        price: 5595,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 10K',
        category: 'Pulsa/Paket Data',
        code: 'T',
        price: 10450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 20K',
        category: 'Pulsa/Paket Data',
        code: 'T',
        price: 20009,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 25K',
        category: 'Pulsa/Paket Data',
        code: 'T',
        price: 24975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 50K',
        category: 'Pulsa/Paket Data',
        code: 'T',
        price: 48975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 100K',
        category: 'Pulsa/Paket Data',
        code: 'T',
        price: 98975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 200K',
        category: 'Pulsa/Paket Data',
        code: 'T',
        price: 196187,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // XL
      {
        id: uuid.v4(),
        name: 'TRI 5K',
        category: 'Pulsa/Paket Data',
        code: 'X',
        price: 5975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 10K',
        category: 'Pulsa/Paket Data',
        code: 'X',
        price: 10975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 25K',
        category: 'Pulsa/Paket Data',
        code: 'X',
        price: 25050,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 50K',
        category: 'Pulsa/Paket Data',
        code: 'X',
        price: 49975,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 100K',
        category: 'Pulsa/Paket Data',
        code: 'X',
        price: 98775,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'TRI 200K',
        category: 'Pulsa/Paket Data',
        code: 'X',
        price: 199000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}
