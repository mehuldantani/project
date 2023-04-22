import dotenv from "dotenv"

//set global variable config
dotenv.config()

const config = {
    //json web token secret key and default expiry
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",

    //mongo db atlas url
    MONGODB_URL:process.env.MONGODB_URL,
    PORT: process.env.PORT || 4000,

    //email configurations
    SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
    SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_UN: process.env.SMTP_MAIL_UN,
    SMTP_MAIL_PW: process.env.SMTP_MAIL_PW,
    SMTP_MAIL_EMAIL: process.env.SMTP_MAIL_EMAIL,

    //AWS configs
    S3_ACCESS_KEY:process.env.S3_ACCESS_KEY,
    S3_SECRET_ACCESS_KEY:process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME:process.env.S3_BUCKET_NAME,
    S3_REGION:process.env.S3_REGION,
}

export default config