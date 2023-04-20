import mongoos from "mongoose";
import app from "./app";
import config from "./config/config";

//self/Immediately Invoked Function Expression (IIFY)
//create a function and execute immediately
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB Connected Successfully")

        app.on('error',(err) => {
            console.log("Error",err);
            throw err
        })

        //calllback function
        const onListening = () =>{
            console.log(`Server started on ${config.PORT}.`)
        }

        //start app
        app.listen(config.PORT, onListening)

    } catch (err) {
        console.log("ERROR",err);
        throw err
    }

})()