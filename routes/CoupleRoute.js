'use strict'
const CoupleValidation = require('../controllers/validation/CoupleValidation')
const CoupleController = require('../controllers/CoupleController')
const Couple = require('../models').Couple
const User = require('../models').User

module.exports = (options) => {
    const app = options.app
    const middlewares = options.middlewares
    
    app.route('/couples/:coupleId')
      .get(
        CoupleController.index)
      .put(
        middlewares.isLoggedIn,
        middlewares.hasRole('owner'),
        middlewares.checkEntityExists(Couple, 'coupleId'),
        CoupleValidation.update,
        middlewares.handleValidation,
        middlewares.checkCoupleOwner,
        CoupleController.update)

    app.route('/couples')
      .post(
        middlewares.isLoggedIn,
        middlewares.hasRole('owner'),
        CoupleValidation.create,
        middlewares.handleValidation,
        CoupleController.create)
}  