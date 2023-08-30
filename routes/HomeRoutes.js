'use strict'

module.exports = (options) => {
  const app = options.app
  app.get('/', (req, res) => {
    res.send('BO API. Check <a href="https://github.com/IISSI2-IS/Deliv-Backend">Repository</a>')
  })
}
