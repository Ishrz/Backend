const express=require('express')
const noteModel=require('./models/note.model.js')

const app=express()

app.use(express.json())

app.get('/notes',async (req,res)=>{
    const notesdata=await noteModel.find()
    res.json({notes_data : notesdata})
})


app.post('/notes',async(req,res)=>{
    const {title,content} = req.body
    console.log(title ,  content)

    await noteModel.create({title,content})

    res.status(201).json("data created succesfully")
})




module.exports=app