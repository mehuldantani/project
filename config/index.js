import dotenv from "dotenv"

//set global variable config
dotenv.config()

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
    MONGODB_URL:process.env.MONGODB_URL,
    PORT: process.env.PORT || 4000
}

export default config