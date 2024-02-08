'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    static associate(models) {
    }
  }

  Invitation.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'confirmed', 'denied']
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
