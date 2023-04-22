import s3 from "../utils/aws.js"

//upload a file
export const s3fileupload = async({
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
export const deleteFile = async({bucketName,key}) =>{

    return await s3.deleteObject({
        Bucket:bucketName,
        Key:key
    })
    .promise()

}