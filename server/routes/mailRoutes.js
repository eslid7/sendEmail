'use strict'

const express = require('express')
const mailController= require('../controllers/mailController')
const router = express.Router()

router.route('/sendMail').post(mailController.send)


module.exports = router