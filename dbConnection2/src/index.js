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

app.delete('/notes/:id',async(req,res)=>{
    const id=req.params.id
    // console.log(id)
    await noteModel.findByIdAndDelete({
        _id:id
    })

    res.json("Deleted successfuly")
})

app.patch('/notes/:id',async(req,res)=>{
    const id=req.params.id
    const {title} = req.body

    const updateData=await noteModel.findByIdAndUpdate(
        {
            _id:id
        },
        {
            title
        })

    res.json({Your_Updated_data:updateData})
})




module.exports=app