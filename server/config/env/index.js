'use strict'

const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`)
const defaults = {
  port: 5050,
}

module.exports = Object.assign(defaults, config)