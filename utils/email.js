const transporter = require("../config/transporter_config.js")
const config = require("../config/config")

const email = async (options) => {
    const message = {
        from: config.SMTP_MAIL_EMAIL,
        to: options.email,
        subject: options.subject,
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset Password</title>
            <style>
              * {
                box-sizing: border-box;
              }
        
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
              }
        
              h1 {
                margin: 0 0 20px;
                font-size: 24px;
                font-weight: 700;
                text-align: center;
                color: #007bff;
              }
        
              p {
                margin: 0 0 20px;
              }
        
              a {
                color: #007bff;
                text-decoration: none;
              }
        
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 40px;
                border-radius: 4px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
        
              .logo {
                display: block;
                margin: 0 auto 40px;
                max-width: 100%;
                height: auto;
              }
        
              .button {
                display: inline-block;
                padding: 10px 20px;
                border-radius: 4px;
                background-color: #007bff;
                color: #fff;
                text-align: center;
                text-decoration: none;
                transition: background-color 0.2s ease-in-out;
              }
        
              .button:hover {
                background-color: #0062cc;
              }
        
              /* Media queries for mobile responsiveness */
              @media screen and (max-width: 767px) {
                .container {
                  max-width: 100%;
                  padding: 20px;
                }
        
                h1 {
                  font-size: 22px;
                }
        
                p {
                  font-size: 14px;
                }
        
                .button {
                  padding: 8px 16px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Reset Your Password</h1>
              <p>Hello ${options.name},</p>
              <p>We received a request to reset your password for CloudCart.</p>
              <p>Please click the button below to reset your password:</p>
              <p><a href="${options.text}" class="button">Reset Password</a></p>
              <p>The link is valid only for next 30 minutes.</p>
              <p>If you did not request a password reset, please disregard this email.</p>
              <p>Best regards,<br />Team CloudCart</p>
            </div>
          </body>
        </html>
        `
    }

    try {
        await transporter.sendMail(message)
    } catch (error) {
        console.log(error)
        console.log('Error While Sending Email.')
    }
}

module.exports = email
