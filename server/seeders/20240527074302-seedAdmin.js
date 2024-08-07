'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/admin.json')
    data = data.map(el => {
      el.password = hashPassword(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', data)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users')
  }
};
