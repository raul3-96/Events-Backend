const { check } = require('express-validator')

module.exports = {
  create: [
    check('firstName').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('lastName').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('password').exists(),
    check('password').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the password'),
    check('phone').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  ],
  update: [
    check('firstName').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('lastName').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('phone').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  ],
  login: [
    check('phone').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('password').exists().isString(),
  ]
}
