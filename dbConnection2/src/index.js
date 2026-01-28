const express=require('express')
const noteModel=require('./models/note.model.js')

const app=express()

app.use(express.json())

app.get('/users',(req,res)=>{
    const usersdata=noteModel.find
    res.json(`heres your data : ${usersdata}`)
})


app.post('/users',(req,res)=>{
    const {title,content} = req.body
    console.log(title ,  content)

    noteModel.create({title,content})

    res.json("data recieved")
})




module.exports=app