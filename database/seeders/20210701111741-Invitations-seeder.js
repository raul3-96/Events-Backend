'use strict'
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

    await queryInterface.bulkInsert('Invitations',
      [
        { id:1,status: 'pending', updatedAt: new Date(),createdAt:new Date(), userId: 1 },
        { id:2,status: 'denied', updatedAt: new Date(),createdAt:new Date(), userId: 2}
      ], {})

    await queryInterface.bulkInsert('GuestInvitations',
    [
      // Invitacion 1
      { invitationId: 1, name: "pepe", child: false, createdAt: new Date(),updatedAt:new Date() },
      // Invitacion 2
      //
      { invitationId: 2, name: "pablo", child: false, createdAt: new Date(),updatedAt:new Date()},
      { invitationId: 2, name: "rocio", child: false, createdAt: new Date(),updatedAt:new Date() }
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
        await sequelize.query('TRUNCATE TABLE Invitations', options)
        await sequelize.query('TRUNCATE TABLE GuestInvitations', options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
