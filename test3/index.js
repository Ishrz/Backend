const express= require('express')
const app=express()
app.use(express.json())


const notes=[]

app.get("/notes",(req,res)=>{
    console.log("notes route hit")
    res.send(notes)
})

app.post('/notes',(req,res)=>{
    const {id}=req.body
    console.log(req.body)
    notes.push(req.body)
    res.status(201).send(`note created id=${id}`)
})

app.put('/notes/update/:id',(req,res)=>{
    const data=req.body
    const {id}=req.params
    console.log(id)


    for(let i=0; i<notes.length;i++){
        if(notes[i].id == id){
            notes[i]=data
            console.log(notes)
            res.status(205).send(`resoursce updated with note  data`)
        }else{
            res.status(200).send("cant find the resource")
        }
    }

    res.send(`params send`)
})

app.listen(3000,()=>{
    console.log("server started....")
})


