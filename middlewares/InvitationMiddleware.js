'use strict'
const models = require('../models')
const Invitation = models.Invitation

module.exports = {
  checkInvitationOwner: async (req, res, next) => {
    try {
      const invitation = await Invitation.findByPk(req.params.invitationId)
      if (req.user.id === invitation.userId) {
        return next()
      }
      return res.status(403).send('Not enough privileges. This entity does not belong to you')
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}
