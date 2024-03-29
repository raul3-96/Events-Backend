const { check } = require('express-validator')
const { Invitation,User } = require('../../models')

const checInvitationConfirmed = async (value, { req }) => {
    try {
        const invitation = await Invitation.findByPk(req.params.invitationId,
        {
            attributes: ['status']
        })
        if (order.status) {
        return Promise.reject(new Error('The invitation doesnt exists'))
        } else if(invitation.status != 'pending') {
        return Promise.reject(new Error('The invitation is confirmed.'))
        }else {
            return Promise.resolve('ok')
        }
    } catch (err) {
        return Promise.reject(err)
    }
}

const checkUserExits = async (value, { req }) => {
  try {
    const user = await User.findByPk(req.body.userId)
    if (user === null) {
      return Promise.reject(new Error('The userId does not exist.'))
    } else { 
      /*const invs = await Invitation.findAll({
        attributes: ['userId'],
      })
      if(invs.some(inv => inv.userId == req.body.userId)){
        return Promise.reject(new Error('The invitation by userId already exist.'))
      }*/
      return Promise.resolve()
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}


const checkConfirm = async (value, { req }) => {
  try {
    const invitation = await Invitation.findByPk(req.params.invitationId)
    if(invitation.status === 'confirmed')
      return Promise.reject(new Error('No puede cancelar una vez ha sido aceptada la invitacion'))

    else if(invitation.status === 'denied')
      return Promise.reject(new Error('No puede cancelar una invitacion ya cancelada'))
    else
      return Promise.resolve()
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const checkGuests = async (value, { req }) => {
  try {
    for(const guest in req.body){
      if(req.body[guest].name && typeof  req.body[guest].name === "string")
        return Promise.resolve()
      else return Promise.reject(new Error('The data value is not correct.'))
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const checkGuest = async (value, { req }) => {
  try {
      if(req.body.name && typeof req.body.name === "string")
        return Promise.resolve()
      else return Promise.reject(new Error('The data value is not correct.'))
    
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

module.exports = {
  create: [
    check('userId').custom(checkUserExits),
  ],
  createGuests: [
    check('name').custom(checkGuests)
  ],
  createGuest: [
    check('name').custom(checkGuest)
  ],
  denied: [
    check('status').custom(checkConfirm)
  ],
  updateGuest: [
    check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  ],
  destroy: [
    check('startedAt').custom(checInvitationConfirmed)
  ]
}