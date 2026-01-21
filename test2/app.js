const express=require('express')
const handleUserRoutes=require('./routes/userroutes.js')
const {Router}= require('express')
const app=express()

const hndleFnc=handleUserRoutes.handleUserRoutes

// hndleFnc(app)

Router(app)





app.listen(3000,()=>{
    console.log("Server Started....")
})