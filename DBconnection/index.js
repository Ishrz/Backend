const express =require('express')

const app=express()

app.use(express.json())

const users=[{name:"shaikh",id:1},{name:"khan",id:2},{name:"xyz",id:2}]

app.get('/users',(req,res)=>{
    console.log("get users route hit sending users list to client....")
    res.status(200).json(users)
    console.log(users)
})

app.post('/users',(req,res)=>{
    const {name}=req.body
    
    console.log(`users post route hit with ${name} adding it in users `)
    users.push(name)
    res.status(201).json("new resource added in users list")

    console.log(users)

})

app.put('/users:index',(req,res)=>{

        console.log(`users put route hit with ${index} updating its user in users `)

        const {name} =req.body
        
        for(let i=0; i<users.length;i++){
                if(users[i+1]==index){
                    users[i].name=name
                    res.json("name is updated")
                }
        }
    })

app.delete('/users',(req,res)=>{
    const {name}=req.body

    for(let i=0;i<users.length;i++){
        if(users[i].name ==name){
            users[i]=null
            res.json("data is deleted")
        }
    }
})





module.exports= app