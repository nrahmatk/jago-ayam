'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/categories.json')
    data = data.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Categories', data)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories')
  }
};
