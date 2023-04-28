import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mongoos from "mongoose";
import config from "./config/config";
import routes from "./routes/index"

//initiate express instance
const app = express()

//self/Immediately Invoked Function Expression (IIFY)
//create a function and execute immediately
(async () => {
    try {
        await mongoos.connect(config.MONGODB_URL)
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


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
//morgan logger
app.use(morgan('tiny'))
app.use("/api/v1/", routes)

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

export default app