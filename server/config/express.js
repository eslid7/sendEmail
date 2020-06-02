'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const config = require('./env')
const routes = require('../routes')


module.exports.initRoutes = function initRoutes(app) {
  app.use('/', routes)
}

module.exports.initMiddlewares = function initMiddlewares(app) {
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(
    bodyParser.urlencoded({
       limit: '50mb',
       extended: true,
       parameterLimit: 50000,
    })
  )
}

module.exports.init = () => {
  const app = express()
  this.initMiddlewares(app)
  this.initRoutes(app)
  app
    .listen(config.port, () => {
      console.log(
        'App listening on port %s, in environment %s!',
        config.port,
        process.env.NODE_ENV || 'develop'
      )
      console.log('**********************')
      console.log('contab-server online')
      console.log('**********************')
    })
    .on('error', err => {
      console.error(err)
    })
  return app
}
