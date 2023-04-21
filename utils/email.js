import transporter from "../config/transporter_config"
import config from "../config/config"


const email = async (options) =>{
    const message = {
        from: config.SMTP_MAIL_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.text
       // html:"<b>Hello There!!!<b>"
        }

    await transporter.sendmail(message)
}

export default email