const nodemailer = require("nodemailer")
const config = require("./config")

let transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: config.SMTP_MAIL_UN,
      pass: config.SMTP_MAIL_PW
    },
  });

module.exports = transporter