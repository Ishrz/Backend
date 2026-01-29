const express=require('express')


const app=express()

const jsonFnc=express.json()
// app.use(express.json())

app.get("/user",jsonFnc,(req,res)=>{
        const {name,role,isPaid} = req.body
        console.log(name,role,isPaid)
        if(!isPaid){
            res.json(`Hello ${name} you havent paid till now your ${role} is not approved `)
        }else{
            res.json(`Hello ${name} your ${role} is approved`)
        }
})


// app.post("/user",(req,res)=>{

// })

// app.delete("/user",(req,res)=>{

// })

// app.patch("/user",(req,res)=>{

// })


module.exports=app