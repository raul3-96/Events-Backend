'use strict'
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {})
    */

    await queryInterface.bulkInsert('Users',
      [
        { id:1,firstName: 'Pepe', lastName: 'rodriguez', password: bcrypt.hashSync('secret', salt), phone: '+3466677882', userType: 'guest' },
        { id:2,firstName: 'Pablo', lastName: 'Romero ', password: bcrypt.hashSync('secret', salt), phone: '+3466677883', userType: 'guest'},
        { id:3,firstName: 'Raul', lastName: 'Romero ', password: bcrypt.hashSync('secret', salt), phone: '+3466677888', userType: 'owner'}
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {})
     */
    const { sequelize } = queryInterface
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction }
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options)
        await sequelize.query('TRUNCATE TABLE Users', options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
