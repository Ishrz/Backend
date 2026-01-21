const express=require('express')

const app=express()

app.get('user/',(res,req)=>{
   console.log("hello")
})

app.listen(3000,()=>{
    console.log("Server Started......")
});