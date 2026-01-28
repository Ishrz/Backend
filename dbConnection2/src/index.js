const express=require('express')

const app=express()

app.use(express.json())

app.get('/users',(req,res)=>{
    res.json("heres your data")
})


app.post('/users',(req,res)=>{
    
})




module.exports=app