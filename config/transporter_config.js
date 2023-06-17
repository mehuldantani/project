const nodemailer = require("nodemailer");
const config = require("./config");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.SMTP_MAIL_UN,
    pass: config.SMTP_MAIL_PW,
  },
});

module.exports = transporter;
