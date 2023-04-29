const s3 = require("../utils/aws.js")

//upload a file
const s3fileupload = async({
    bucketName,key,body,contentType
}) =>{
    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType
    })
    .promise()
}

//delete a file
const s3filedelete = async({bucketName,key}) =>{

    return await s3.deleteObject({
        Bucket:bucketName,
        Key:key
    })
    .promise()

}

module.exports = {s3filedelete,s3fileupload}