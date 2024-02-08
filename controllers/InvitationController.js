'use strict'
const models = require('../models')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const Invitation = models.Invitation
const GuestInvitation = models.GuestInvitation
const User = models.User

exports.index = async function (req, res) {
  try {
    const invitations = await GuestInvitation.findAll({
      attributes: {
        exclude: ['userId'] // Excluye el atributo 'userId' de la tabla Invitation
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['firstName', 'phone'] // Lista de campos que deseas incluir de la tabla User
        },
        {
          model:models.Invitation,
          as : 'invitation'
        }
      ],order: [['invitationId', 'ASC']]
    });
    const invitationsGrouped = invitations.reduce((grouped, invitation) => {
      const invitationId = invitation.invitationId;
      if (!grouped[invitationId]) {
        grouped[invitationId] = [];
      }
      grouped[invitationId].push(invitation);
      return grouped;
    }, {});
    res.json(invitationsGrouped)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.indexOwner = async function (req, res) {
  try {
    const guestInvitation =await GuestInvitation.findOne({where: {
      userId: req.params.userId
      }
    })
    const invitations = await Invitation.findAll(
      {
        attributes: ['status', 'updatedAt'],
        where: { id: guestInvitation.invitationId }
      })
    res.json(invitations)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.create = async function (req, res) {
  const newUser= User.build(req.body.user)
  const newGuest = GuestInvitation.build(req.body.guest)
  try {
    let invitationId = req.body.invitation
    if(req.body.invitation == 0){
      const newInvitation = Invitation.build()
      const invitation = await newInvitation.save()
      invitationId = invitation.id
    }
    newUser.lastName = ''
    newUser.userType = 'guest'
    const user = await newUser.save()

    newGuest.userId = user.id
    newGuest.invitationId=invitationId
    await newGuest.save()

    res.json(newGuest)
  } catch (err) {
      res.status(500).send(err)
  }
}

async function createInvitation() {
  const newInvitation = Invitation.build({})
  try {
    const invitation = await newInvitation.save()
    return invitation.invitation.id
  } catch (err) {
      return 0
  }
}

async function createUserDefault(name){
  const userDefault = User.build({})
  try{
    userDefault.firstName = name
    userDefault.lastName = ''
    userDefault.password = 'BODAsecret'
    userDefault.userType='guest'
    return await userDefault.save()
  }catch (err){
    console.log(err)
    return null
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
  //usado para crear en el front por cada usuario
  let guest =await GuestInvitation.build(req.body)
  try {
    let invitation = req.params.invitationId
    if(!req.params.invitationId)
      invitation = createInvitation()
    if(invitation==0)
      res.status(500).send('Error al insertar una nueva invitacion')
  
    const newUser = await createUserDefault(req.body.name)
    if(newUser){
      guest.invitationId = invitation
      guest.userId = newUser.id
      const guests2=await guest.save()
      
      /*const guests2 =await GuestInvitation.findOne({where: {
        invitationId: req.params.invitationId
        }
      }) */ 
      res.json(guests2)
    }
    else
      res.json("Ha ocurrido un error")
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.show = async function (req, res) {
  // Only returns PUBLIC information of invitations
  try {
    const invitation = await Invitation.findByPk(req.params.invitationId, {})
    res.json(invitation)
  } catch (err) {
    res.status(500).send(err)
  }
}
exports.showByUser = async function (req, res) {
  // Only returns PUBLIC information of invitations
  try {
    const guestInvitation =await GuestInvitation.findOne({where: {
      userId: req.params.userId
      }
    })
    const invitation = await Invitation.findByPk(guestInvitation.invitationId, {
    })/*req.params.userId, {
      attributes: { exclude: ['userId'] },
    })*/
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
    },
    include:[{ model: User, as: 'user' }]
  })
  if(req.body.name)
    guest.user.firstName = req.body.name
  if(req.body.alergenos)
    guest.alergenos = req.body.alergenos
  if(req.body.child != null && (req.body.child || !req.body.child))
    guest.child = req.body.child
  try {
    //const result = await GuestInvitation.destroy({ where: { id: req.params.id },transaction })
    if(req.body.name)
      guest.user.save()
    await guest.save()
    res.json(guest)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.destroy = async function (req, res) {
  try {
    const invitations = await GuestInvitation.findAll({where : { invitationId:req.params.invitationId},
    include: [{
          model: models.Invitation,
          as: 'invitation',
        }
        ,{
          model: models.User,
          as: 'user',
        }
      ],})
    /*await invitation.user.destroy()
    await invitation.invitation.destroy()*/
    let result =0
    for(const invitation of invitations){
      await invitation.invitation.destroy()
      result = await invitation.user.destroy()
    }
    //const result = await GuestInvitation.destroy({ where: { invitationId: req.params.invitationId } })
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
    const guests = await GuestInvitation.findOne({where:{id:req.params.id}})
    if(guests == null)
      throw new ('No se puede eliminar')
    const result = await GuestInvitation.destroy({ where: { id: req.params.id } })
    await User.destroy({where:{ id : guests.userId}})//TODO CAMBIAR A USER
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
      invitationId: req.params.invitationId,
      }, include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['firstName'] // Lista de campos que deseas incluir
        }
      ],
      exclude : ["userId"]				  
    })
    res.json(guests)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateUser =   async function (req, res) {
  try {
    let guest =await GuestInvitation.findOne({where: {
      id: req.body.id
      },
      include:[{ model: User, as: 'user' }]
    })
    
    if(req.phone || req.body.name|| req.body.password ||req.body.phone){
      if(req.body.phone)
        guest.phone = req.body.phone
      if(req.body.name)
        guest.user.firstName = req.body.name
      if(req.body.phone)
        guest.user.phone = req.body.phone
      if(req.body.password){
        guest.user.password = req.body.password
      }
      await guest.user.save()
    }
    if(req.body.alergenos || req.body.child != null){
      if(req.body.alergenos)
        guest.alergenos = req.body.alergenos
      if(req.body.child != null && (req.body.child || !req.body.child))
        guest.child = req.body.child
      
      await guest.save();
    }
    res.json(guest)
  } catch (err) {
    res.status(500).send(err)
  }
}