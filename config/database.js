const mongoose = require('mongoose');
const config = require("./config.js");

// URL to connect to mongoDB
const MONGODB_URL = config.MONGODB_URL
console.log(MONGODB_URL)
// export function that can be used in other files to connect the db.
exports.connect = () => {
    // connect to db
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('DB Connected Successfully.')
    }).catch((error) => {
        console.log('DB connection failed.')
        console.log(error)

        // exit with failure code 1- failure 0-close after db connect
        process.exit(1)
    })
}
