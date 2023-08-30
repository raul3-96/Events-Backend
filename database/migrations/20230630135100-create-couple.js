'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Couples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      husbandName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wifeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weddingDate:{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      weddingVenue:{
        type: Sequelize.STRING,
      },
      invitationPlace:{
        type: Sequelize.STRING,
      },
      timingWedding:{
        type: Sequelize.TIME,
      },
      timingInvitation:{
        type: Sequelize.TIME,
      },
      timingParty:{
        type: Sequelize.TIME,
      },
      about:{
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      userId: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Couples')
  }
}
