const aws = require("aws-sdk/clients/s3")
const config = require("../config/config.js")

const s3 = new aws({
    region: config.S3_REGION ,
    accessKeyId: config.S3_ACCESS_KEY,
    secretAccessKey: config.S3_SECRET_ACCESS_KEY,
    
})

module.exports = {s3}