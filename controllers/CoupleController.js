'use strict'
const models = require('../models')
const Couple = models.Couple


exports.index = async function (req, res) {
    try {
      const couple = await Couple.findByPk(req.params.coupleId,{attributes: { exclude: ['id'] }})
      res.json(couple)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  exports.create = async function (req, res) {
    const newCouple = Couple.build(req.body)
  
    try {
      const couple = await newCouple.save()
      res.json(couple)
    } catch (err) {
        res.status(500).send(err)
    }
  }

  exports.update = async function (req, res) {        
    try {
      await Couple.update(req.body, { where: { id: req.params.coupleId } })
      const updateCouple = await Couple.findByPk(req.params.coupleId)
      res.json(updateCouple)
    } catch (err) {
      res.status(500).send(err)
    }
  }