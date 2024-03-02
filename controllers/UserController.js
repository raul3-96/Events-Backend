'use strict'
const models = require('../models')
const User = models.User
const GuestInvitation = models.GuestInvitation
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const crypto = require('crypto')
const { Sequelize } = require('sequelize')

exports.indexWithInvitation = async function (req, res) {
  try {
    const users = await User.findAll({ include: models.Invitation })
    res.json(users)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.registerGuest = function (req, res) {
  _register(req, res, 'guest')
}

exports.registerOwner = function (req, res) {
  _register(req, res, 'owner')
}

const findByToken = function (providedToken) {
  return User.findOne({ where: { token: providedToken }, attributes: { exclude: ['password'] } })
    .then(user => {
      if (!user) { // token not valid
        throw new Error('Token not valid')
      }
      if (user.tokenExpiration < new Date()) {
        throw new Error('Token expired.')
      }
      return user ? user.dataValues : null
    })
    .catch(err => {
      throw err
    })
}

exports.findByToken = findByToken

exports.isTokenValid = async function (req, res) {
  try {
    const user = await findByToken(req.body.token)
    res.json(user)
  } catch (err) {
    return res.status(403).send({ errors: err.message })
  }
}

exports.loginOwner = async function (req, res) {
  _login(req, res, 'owner')
}

exports.loginGuest = async function (req, res) {
  _login(req, res, 'guest')
}

exports.show = async function (req, res) {
  // Only returns PUBLIC information of users
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['firstName', 'userType']
    })
    res.json(user)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.update = async function (req, res) {
  try {
    await User.update(req.body, { where: { id: req.user.id } })
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } })// update method does not return updated row(s)
    res.json(user)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.destroy = async function (req, res) {
  try {
    const result = await User.destroy({ where: { id: req.params.userId } })
    let message = ''
    if (result === 1) {
      message = 'Sucessfuly deleted.'
    } else {
      message = 'Could not delete user.'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

const _register = async (req, res, userType) => {
  const newUser = User.build(req.body)
  newUser.userType = userType
  newUser.token = crypto.randomBytes(20).toString('hex')
  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 1)
  newUser.tokenExpiration = expirationDate
  try {
    const registeredUser = await newUser.save()
    res.json(registeredUser)
  } catch (err) {
    if (err.name.includes('ValidationError') || err.name.includes('SequelizeUniqueConstraintError')) {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}

const _login = async function (req, res, userType) {
  try {
    const user = await User.findOne({ where: { phone: req.body.phone/*, userType*/ } })
    //TODO: Provisional para validar usuarios del mismo núcleo
    let isValid=false;
    if(user){
      const guest = await GuestInvitation.findOne({where:{userId : user.id}})
      if(guest){
        const invitations = await GuestInvitation.findAll({where:{invitationId : guest.invitationId}})
        if(invitations.length>1){
          const userIds = invitations.map(invitation => invitation.userId);
          const users = await User.findAll({
            where: {
              id: {
                [Sequelize.Op.in]: userIds,
              },
            },
          });
          const passwordToCompare = req.body.password;
          const authenticatedUsers = users.filter(user => {
            return bcrypt.compareSync(passwordToCompare, user.password);
          });
          if(authenticatedUsers.length > 0)
            isValid =true;
          }
      }
    }
    //FIN TODO
    if (!isValid && (!user || !bcrypt.compareSync(req.body.password, user.password))) {
      return res.status(401).send({ errors: [{ param: 'login', msg: 'Wrong credentials' }] })
    } else {
      // Possible improvement: Encode user object so it could decoded when an API call is made
      user.token = crypto.randomBytes(20).toString('hex')
      const expirationDate = new Date()
      expirationDate.setHours(expirationDate.getHours() + 1)
      user.tokenExpiration = expirationDate
      await user.save()
      const userWithoutPassword = await User.findByPk(user.id, { attributes: { exclude: ['password'] } })
      res.json(userWithoutPassword)
    }
  } catch (err) {
    res.status(401).send(err)
  }
}
