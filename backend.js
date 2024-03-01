const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const helmet = require('helmet')
const fs = require('fs')
const https = require('https')


const app = express()
app.use(express.json()) // parser de requests body como json
app.use(cors()) // habilita peticiones desde otro dominio
app.use(helmet({ // seguridad general en servicios REST
  crossOriginResourcePolicy: false // permite carga de imágenes del archivo public
}))

app.use('/public', express.static(path.join(__dirname, '/public')))// Serves resources from public folder

// require only admits one parameter, so we need to create an object composed of both parameters needed on routes
const requireOptions = { app }
require('./routes/')(requireOptions)

const { initPassport } = require('./config/passport')
initPassport()

const { initSequelize } = require('./config/sequelize')
const sequelize = initSequelize()
const serverIP = process.env.IP || '127.0.0.1';
const port = process.env.APP_PORT || 3000

sequelize.authenticate()
  .then(() => {
    console.info('INFO - Database connected.')

    if(process.env.ENV == 'dev'){
      return app.listen(port, serverIP, () => {
        console.log(`listening at http://${serverIP}:${port}`);
      });
    }else{
      const options={
        key:fs.readFileSync('/etc/nginx/ssl/_.carmenyraulsecasan.es_private_key.key'),
        cert:fs.readFileSync('/etc/nginx/ssl/carmenyraulsecasan.es_ssl_certificate.cer')
      }
      const server = https.createServer(options, app)
	    return server.listen(port, serverIP/*'5.250.184.173'*/, () =>{console.log(`listening at http://${serverIP}:${port}`)})
    }
  })
  .then((server) => {
    console.log(`BO listening at http://${serverIP}:${port}`)
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })
