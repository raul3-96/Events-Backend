const { check } = require('express-validator')
const { Couple,User } = require('../../models')

const checkUserExits = async (value, { req }) => {
    try {
      const user = await User.findByPk(req.body.userId)
      if (user === null) {
        return Promise.reject(new Error('The userId does not exist.'))
      } else { 
        const coup = await Couple.findAll({
          attributes: ['userId'],
        })
        if(coup.some(inv => inv.userId == req.body.userId)){
          return Promise.reject(new Error('The invitation by userId already exist.'))
        }
        return Promise.resolve()
      }
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  }

module.exports = {
  create: [
    check('husbandName').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('wifeName').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('weddingDate').exists().isDate(),
    check('userId').custom(checkUserExits),
  ],
  update: [
    check('husbandName').optional().isString().isLength({ min: 1, max: 255 }).trim(),
    check('wifeName').optional().isString().isLength({ min: 1, max: 255 }).trim(),
    check('weddingDate').optional().isDate(),
    check('userId').not().exists()
  ]
}