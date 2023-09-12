'use strict'
const models = require('../models')
const Invitation = models.Invitation
const GuestInvitation = models.GuestInvitation

exports.index = async function (req, res) {
  try {
    const invitations = await Invitation.findAll(
      {
        attributes: ['status', 'updatedAt'],
      }
    )
    res.json(invitations)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.indexOwner = async function (req, res) {
  try {
    const invitations = await Invitation.findAll(
      {
        attributes: ['status', 'updatedAt'],
        where: { userId: req.user.id }
      })
    res.json(invitations)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.create = async function (req, res) {
  const newInvitation = Invitation.build(req.body)
  //newInvitation.userId = req.user.id // usuario actualmente autenticado

  try {
    const invitation = await newInvitation.save()
    res.json(invitation)
  } catch (err) {
      res.status(500).send(err)
  }
}

exports.createGuests = async function (req, res) {
  let guests =await GuestInvitation.build(req.body)
  try {
    for(const guest of guests){
      guest.invitationId = req.params.invitationId
      await guest.save()
    }
    const guests2 =await GuestInvitation.findAll({where: {
      invitationId: req.params.invitationId
      }
    })
    res.json(guests2)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.createGuest = async function (req, res) {
  let guest =await GuestInvitation.build(req.body)
  try {
    guest.invitationId = req.params.invitationId
    await guest.save()
    
    const guests2 =await GuestInvitation.findOne({where: {
      invitationId: req.params.invitationId
      }
    })
    res.json(guests2)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.show = async function (req, res) {
  // Only returns PUBLIC information of invitations
  try {
    const invitation = await Invitation.findByPk(req.params.invitationId, {
      attributes: { exclude: ['userId'] },
    })
    res.json(invitation)
  } catch (err) {
    res.status(500).send(err)
  }
}
exports.showByUser = async function (req, res) {
  // Only returns PUBLIC information of invitations
  try {
    const invitation = await Invitation.findByPk(req.params.userId, {
      attributes: { exclude: ['userId'] },
    })
    res.json(invitation)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function processStatus(res, status, id) {

  /*let invitation = await Invitation.findByPk(id)
  invitation.status = status
  invitation.updatedAt = new Date()*/

  const invitation = await Invitation.update({status: status}, { where: { id: id}})
  res.json(invitation)
}

exports.denied = async function (req, res) {
  try {
    await processStatus('denied', req.params.invitationId)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.confirm = async function (req, res) {
  try {
    await processStatus(res, 'confirmed', req.params.invitationId)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.pending = async function (req, res) {
  try {
    await processStatus(res, 'pending', req.params.invitationId)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateGuests = async function (req, res) {
  let guests =await GuestInvitation.build(req.body)
  const transaction = await models.sequelize.transaction()
  try {
    const result = await GuestInvitation.destroy({ where: { invitationId: req.params.invitationId },transaction })
    for(const guest of guests){
      guest.invitationId = req.params.invitationId
      await guest.save({transaction})
    }
    await transaction.commit()
    const guests2 =await GuestInvitation.findAll({where: {
      invitationId: req.params.invitationId
      }
    })
    res.json(guests2)
  } catch (err) {
    await transaction.rollback();
    res.status(500).send(err)
  }
}
exports.updateGuest = async function (req, res) {
  let guest =await GuestInvitation.findOne({where: {
    id: req.params.id
    }
  })
  if(req.body.name)
    guest.name = req.body.name
  if(req.body.alergenos)
    guest.alergenos = req.body.alergenos
  if(req.body.child != null && (req.body.child || !req.body.child))
    guest.child = req.body.child
  try {
    //const result = await GuestInvitation.destroy({ where: { id: req.params.id },transaction })
    await guest.save(guest)
    res.json(guest)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.destroy = async function (req, res) {
  try {
    const result = await Invitation.destroy({ where: { id: req.params.invitationId } })
    let message = ''
    if (result === 1) {
      message = 'Sucessfuly deleted invitation id.' + req.params.invitationId
    } else {
      message = 'Could not delete invitation.'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.destroyGuest= async function (req, res) {
  try {
    const result = await GuestInvitation.destroy({ where: { id: req.params.id } })
    let message = ''
    if (result === 1) {
      message = 'Sucessfuly deleted invitation id.' + req.params.invitationId
    } else {
      message = 'Could not delete invitation.'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}
/*
exports.confirm = async function (req, res) {
    try {
      const invitation = await Invitation.findByPk(req.params.orderId)
      invitation.updatedAt = new Date()
      const updatedInvitation = await invitation.save()
      res.json(updatedInvitation)
    } catch (err) {
      res.status(500).send(err)
    }
  }

exports.denied = async function (req, res) {
    try {
      const invitation = await Invitation.findByPk(req.params.orderId)
      invitation.updatedAt = new Date()
      const updatedInvitation = await invitation.save()
      res.json(updatedInvitation)
    } catch (err) {
      res.status(500).send(err)
    }
  }
*/
exports.indexInvitation =  async function (req, res) {
  try {
    const guests =await GuestInvitation.findAll({where: {
      invitationId: req.params.invitationId
      }
    })
    res.json(guests)
  } catch (err) {
    res.status(500).send(err)
  }
}