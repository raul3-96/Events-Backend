'use strict'
const UserValidation = require('../controllers/validation/UserValidation')
const UserController = require('../controllers/UserController')
const RestaurantController = require('../controllers/InvitationController')
const User = require('../models').User

module.exports = (options) => {
  const app = options.app
  const middlewares = options.middlewares

  
  app.route('/users/register')
    .post(
      UserValidation.create,
      middlewares.handleValidation,
      UserController.registerGuest)
  app.route('/users/registerOwner')
    .post(
      middlewares.hasRole('owner'),
      UserValidation.create,
      middlewares.handleValidation,
      UserController.registerOwner)
  app.route('/users/login')
    .post(
      UserValidation.login,
      middlewares.handleValidation,
      UserController.loginGuest)
  app.route('/users/loginOwner')
    .post(
      UserValidation.login,
      middlewares.handleValidation,
      UserController.loginOwner)

  /*app.route('/users/myInvitation')
    .get(
      middlewares.isLoggedIn,
      middlewares.hasRole('guest'),
      RestaurantController.indexOwner
    )*/
  app.route('/users/isTokenValid')
    .put(UserController.isTokenValid)

  app.route('/users/:userId')
    .get(
      middlewares.checkEntityExists(User, 'userId'),
      middlewares.isLoggedIn,
      UserController.show)
}
