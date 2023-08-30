'use strict'
const moment = require('moment')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class GuestInvitation extends Model {
    static associate(models) {
      GuestInvitation.belongsTo(models.Invitation, { foreignKey: 'invitationId', as: 'invitation' , onDelete: 'cascade'})
    }
  }

  GuestInvitation.init(
    {
      id:{
        allowNull: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      invitationId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      child: {
        type: DataTypes.BOOLEAN
      },
      name: {
        type: DataTypes.STRING
      },
      alergenos:{
        type: DataTypes.STRING
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
      modelName: 'GuestInvitation'
    }
  )

  return GuestInvitation
}
