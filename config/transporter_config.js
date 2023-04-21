import nodemailer from "nodemailer"
import config from "./config"

let transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: config.SMTP_MAIL_UN,
      pass: config.SMTP_MAIL_PW
    },
  });