const nodemailer = require('nodemailer')
const vars = require('../config/env/development')

const traspoterConfig = {
  maxConnections: vars.maxConnections,
  host: vars.host,
  port: vars.portEmail,
  auth: {
    user: vars.user,
    pass: vars.password,
  },
  tls: {},
}

if (vars.pool && vars.pool === 'true') {
  traspoterConfig.pool = true
}
if (vars.secure && vars.secure === 'true') {
  traspoterConfig.secure = true
}
if (vars.rejectUnauthorized && vars.rejectUnauthorized === 'true') {
  traspoterConfig.tls.rejectUnauthorized = true
}

// Create reusable transporter object
const transporter = nodemailer.createTransport(traspoterConfig)

async function send(req, res){

  if(req.headers.token != vars.token){
    return res.status(400).json({ error: 'No tiene permiso para acceder'})
  }

  const contentToSend = {
    from: vars.from,
    to: req.body.to,
    subject: req.body.subject
      ? req.body.subject
      : `Mensaje de ${vars.appName}`,
  }

  contentToSend.html = req.body.message

  await new Promise((resolve, reject) => {
    transporter.sendMail(contentToSend, (error, info) => {
      if (error) {
        return res.status(400).json(error)
      } else {
        return res.status(200).json(info)
      }
    })
  })
}

async function sendEmail(mailContent, body) {
  await send({
    to: mailContent.to,
    subject: mailContent.subject,
    mensaje: body,
  })
}


module.exports = {
  send,
  sendEmail,
}
