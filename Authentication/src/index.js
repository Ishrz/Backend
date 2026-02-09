const express=require("express")
const userRoute=require("../routes/user.js")
require("dotenv").config()


const app=express()



// app.use(express.static('./public'))
app.use(express.json())



// const getToken = ()=>{
//     const options=["A","B","C","D","a","b","c","d",1,2,3,4]
//     let token=''
//     for(let i=0; i<options.length;i++)
//     token +=options[Math.floor(Math.random()*options.length)]

//     return token
// }


app.use("/api/user" , userRoute)



module.exports=app