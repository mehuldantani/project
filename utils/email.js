const transporter = require("../config/transporter_config")
const config = require("../config/config")


const email = async (options) =>{

    const message = {
        from: config.SMTP_MAIL_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.text
       // html:"<b>Hello There!!!<b>"
        }
    try {
        await transporter.sendmail(message)
    } catch (error) {
        console.log('Error While Sending Email.')
    }
}

module.exports = email