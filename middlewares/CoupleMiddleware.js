'use strict'
const models = require('../models')
const Couple = models.Couple

module.exports = {
  checkCoupleOwner: async (req, res, next) => {
    try {
      const couple = await Couple.findByPk(req.params.coupleId)
      if (req.user.id === couple.userId) {
        return next()
      }
      return res.status(403).send('Not enough privileges. This entity does not belong to you')
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}
