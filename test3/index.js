const express= require('express')
const app=express()
app.use(express())


const notes=[]

app.get("notes",(req,res)=>{
    console.log("notes route hit")
})

app.post('notes',(req,res)=>{
    console.log(req.body)

    notes.push(req.body)
    
    res.send("note created")
})

app.listen(3000,()=>{
    console.log("server started....")
})


