const express =require('express')
const dbConnection=require('./db/dbConnection')

const app=express()

dbConnection()

app.use(express.json())

const users=[{name:"shaikh",id:1},{name:"khan",id:2},{name:"xyz",id:3}]

app.get('/users',(req,res)=>{
    console.log("get users route hit sending users list to client....")
    res.status(200).json(users)
    console.log(users)
})

app.post('/users',(req,res)=>{
    const newUser=req.body
    
    console.log(`users post route hit with ${newUser.name} adding it in users `)
    users.push({...newUser})
    res.status(201).json("new resource added in users list")

    console.log(users)

})

app.patch('/users/:index',(req,res)=>{
    const {index}=req.params
    const {name} =req.body

        console.log(`users put route hit with ${index} updating its user in users `)

        for(let i=0; i<users.length;i++){
                if(users[i].id==index){
                    users[i].name=name
                    res.json("name is updated")
                }
        }
    })

app.delete('/users/:index',(req,res)=>{
    console.log("delet route hit")
    const {index}=req.params
    const {name}=req.body
     console.log(name)
    for(let i=0;i<users.length;i++){
        if(users[i].name ==name){
            users[i]=null
            res.json("data is deleted")
        }
    }
})





module.exports= app