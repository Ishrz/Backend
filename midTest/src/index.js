const express = require("express")
require("dotenv").config()
const app = express()


app.use(express.json())


app.get("/user",(req,res)=>{

})


app.post("/user",(req,res)=>{

})


app.put("/user",(req,res)=>{

})

app.patch("/user",(req,res)=>{

})

app.delete("/user",(req,res)=>{

})



module.exports=app
