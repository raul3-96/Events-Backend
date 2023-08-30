'use strict'
const InvitationValidation = require('../controllers/validation/InvitationValidation')
const InvitationController = require('../controllers/InvitationController')
const Invitation = require('../models').Invitation
const GuestInvitation = require('../models').GuestInvitation


module.exports = (options) => {
  const app = options.app
  const middlewares = options.middlewares
  
  app.route('/invitations')
    .get(
      InvitationController.index)
    .post(
      middlewares.isLoggedIn,
      middlewares.hasRole('owner'),
      InvitationValidation.create,
      middlewares.handleValidation,
      InvitationController.create)

  app.route('/invitations/:invitationId')
    .get(InvitationController.show)
    .delete(
      middlewares.isLoggedIn,
      middlewares.hasRole('owner'),
      middlewares.checkEntityExists(Invitation, 'invitationId'),
      InvitationController.destroy)
  app.route('/invitationsId/:userId')
    .get(InvitationController.showByUser)
  
  app.route('/invitations/:invitationId/denied')    
    .patch(
      middlewares.isLoggedIn,
      middlewares.hasRole('guest'),
      middlewares.checkEntityExists(Invitation, 'invitationId'),
      InvitationValidation.denied,
      middlewares.handleValidation,
      InvitationController.denied)
  app.route('/invitations/:invitationId/confirm')    
    .patch(
      middlewares.isLoggedIn,
      middlewares.hasRole('guest'),
      middlewares.checkEntityExists(Invitation, 'invitationId'),
      middlewares.handleValidation,
      InvitationController.confirm)
  app.route('/invitations/:invitationId/pending')    
    .patch(
      middlewares.isLoggedIn,
      middlewares.hasRole('owner'),
      middlewares.checkEntityExists(Invitation, 'invitationId'),
      middlewares.handleValidation,
      InvitationController.pending)
      
  app.route('/invitations/:invitationId/guests')
    .get(
      InvitationController.indexInvitation)
    .post(middlewares.isLoggedIn,
      middlewares.hasRole('guest'),
      InvitationValidation.createGuest,
      middlewares.checkInvitationOwner,
      middlewares.handleValidation,
      InvitationController.createGuest)
    .put(
        middlewares.isLoggedIn,
        //middlewares.checkOrderCustomer,
        //InvitationValidation.updateGuest,
        middlewares.checkInvitationOwner,
        middlewares.handleValidation,
        InvitationController.updateGuests)
  
  app.route('/invitations/guests/:id')
    .delete(middlewares.isLoggedIn,
      middlewares.hasRole('guest'),
      middlewares.checkEntityExists(GuestInvitation, 'id'),
      InvitationController.destroyGuest)
    .put(
      middlewares.isLoggedIn,
      middlewares.checkEntityExists(GuestInvitation, 'id'),
      //middlewares.checkOrderCustomer,
      //InvitationValidation.updateGuest,
      middlewares.handleValidation,
      InvitationController.updateGuest)

  app.route('/invitations/:invitationId/denied')
    /*.delete(
        middlewares.isLoggedIn,
        middlewares.hasRole('customer'),
        middlewares.checkEntityExists(Invitation, 'ordinvitationIderId'),
        //middlewares.checkOrderCustomer,
        InvitationValidation.destroy,
        middlewares.handleValidation,
        InvitationController.destroy
      )*/

  /*app.route('/invitations/:invitationId/confirm')
    .patch(
        middlewares.isLoggedIn,
        middlewares.hasRole('guest'),
        middlewares.checkEntityExists(Invitation, 'invitationId'),
        middlewares.checkOrderOwnership,
        middlewares.handleValidation,
        InvitationController.confirm)

  app.route('/invitations/:invitationId/denied')
    .patch(
    middlewares.isLoggedIn,
    middlewares.hasRole('guest'),
    middlewares.checkEntityExists(Invitation, 'invitationId'),
    middlewares.checkOrderOwnership,
    middlewares.handleValidation,
    InvitationController.denied)*/
}
