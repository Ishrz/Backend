const express=require('express')

const app=express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        "message":"Hello: '/' route hit"
    })
})

app.get('/user',(req,res)=>{
    res.send([25,26])
})

app.post('/user/1',(req,res)=>{
    // const data=JSON.parse(req.body)
    //  console.log(req.body)
    const {name}=req.body
    const message=  `Hello "${name}" your data is recieved`
    res.status(200).send(message)
})

app.listen(3000,()=>{
    console.log("Server is started.....")
})