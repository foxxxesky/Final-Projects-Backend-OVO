'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_methods', [
      {
        id: uuid.v4(),
        method_name: 'Visipay Wallet',
        instruction: null,
        category: 'E-Wallet',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BCA',
        instruction: '1. Login ke m-BCA \n2. Pilih menu M-Transfer lalu TRANSFER BCA VIRTUAL ACCOUNT\n3. Masukan Nomer Virtual Account\n4. Masukin pin m-BCA.\n5. Ikuti perintah selanjutnya untuk menyelesaikan proses top-up',
        category: 'Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BNI',
        instruction: '1. Buka aplikasi BNI Mobile Banking \n2. Pilih menu Transfer lalu nomor Virtual Account \n3. Masukan nomer Virtual Account \n4. Konfirmasi dan masukan Password Transaksi \n5. Ikuti instruksi selanjutnya untuk menyelesaikan transaksi',
        category: 'Mobile banking',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        method_name: 'BRI',
        instruction: '1. Masuk ke aplikasi BRImo \n2. Pilih menu Transaksi Lain \n3. Pilih menu Pembayaran \n4. Pilih menu Lainnya \n5. Pilih menu BRIVA \n6. Masukan nomer Virtual Account \n7. Konfirmasi dan masukan Password Transaksi \n8. Ikuti instruksi selanjutnya untuk menyelesaikan transaksi',
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
