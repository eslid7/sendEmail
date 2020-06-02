'use strict'

const express = require('express')
const mailRoutes = require('./mailRoutes')

const router = express.Router()

router.use('/api', mailRoutes)

module.exports = router