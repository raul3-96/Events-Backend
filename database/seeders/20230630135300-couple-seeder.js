'use strict'
const fs = require('fs')

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    const weddingTime = new Date()
    weddingTime.setHours(15, 0, 3)
    await queryInterface.bulkInsert('Couples',
      [
        { id:1,husbandName: 'Raul' ,wifeName:"Carmen",weddingDate:new Date(),weddingVenue:"Ruana Alta", invitationPlace:"Ruana Alta", invitationDate:new Date(),timingParty:weddingTime.toLocaleTimeString(), updatedAt: new Date(),createdAt:new Date(), userId: 3 }
      ], {})
  },

  down: async (queryInterface, Sequelize) => {

    const { sequelize } = queryInterface
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction }
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options)
        await sequelize.query('TRUNCATE TABLE Couples', options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
