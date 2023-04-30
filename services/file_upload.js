const {s3} = require("../utils/aws.js")

//upload a file
const s3fileupload = async({
    bucketName,key,body,contentType
}) =>{

    const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType
    }
    console.log(uploadParams)
    return await s3.upload(uploadParams).promise()
}

//delete a file
const s3filedelete = async({bucketName,key}) =>{

    const deleteParams= {
        Bucket:bucketName,
        Key:key
    }
    console.log(deleteParams)
    return await s3.deleteObject(deleteParams).promise()

}

module.exports = {s3filedelete,s3fileupload}