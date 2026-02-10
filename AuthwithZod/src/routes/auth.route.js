const express=require("express")
const userModel= require("../models/user.model")
const bcrypt = require("bcrypt")

const authRouter=express.Router()


authRouter("/register", async (req,res)=>{

    const {name,email,password} = req.body

    if(!name) return res.json("please enter name")
    if(!email) return res.json("email is required")
    if(!password) return res.json("password is required")

    try{
    const userCheck=await userModel.findOne({email})

    if(userCheck?.email == email) return res.json(`User already registered with this email id :${email}`) 
    
    const user = userModel.create({
        name,
        email,
        password:
    })

    }catch(err){
        res.json({message:`something went wrong, error :${err}`})
        console.log(`Error : ${err}`)
    }


})

authRouter("/signin", async(req,res)=>{

})




module.exports=authRouter