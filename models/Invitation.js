'use strict'
const moment = require('moment')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    static associate(models) {
      Invitation.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      //Invitation.hasMany(GuestInvitation, { foreignKey: 'invitationId', as: 'invitations' })
    }
  }

  Invitation.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'confirmed', 'denied']
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
      modelName: 'Invitation'
    }
  )

  return Invitation
}
