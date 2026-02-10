const express =require("express")
const coockieParser=require("cookie-parser")
require("dotenv").config()


const app=express()
app.use(express.json())
app.use(coockieParser())






module.exports=app