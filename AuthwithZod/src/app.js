const express =require("express")
const coockieParser=require("cookie-parser")
const authRouter = require("./routes/auth.route")
require("dotenv").config()


const app=express()
app.use(express.json())
app.use(coockieParser())


app.use("/v1/api/user", authRouter)



module.exports=app