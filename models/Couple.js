'use strict'
const moment = require('moment')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Couple extends Model {
    static associate(models) {
      Couple.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
  }

  Couple.init(
    {
      husbandName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wifeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weddingDate:{
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      weddingVenue:{
        type: DataTypes.STRING,
      },
      invitationPlace:{
        type: DataTypes.STRING,
      },
      timingParty:{
        type: DataTypes.TIME,
      },
      about:{
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    },
    {
      sequelize,
      modelName: 'Couple'
    }
  )

  return Couple
}
