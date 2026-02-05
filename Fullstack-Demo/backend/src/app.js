const express=require("express")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())


app.get("/notes",(req,res)=>{

})

app.post("notes",(req,res)=>{

})

app.patch("/notes:id",(req,res)=>{

})

app.delete("/notes:id",(req,res)=>{

})








module.exports=app