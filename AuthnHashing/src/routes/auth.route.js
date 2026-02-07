const express= require("express")
const userModel=require("../models/user.model.js")
const jwt=require("jsonwebtoken")
const coockieParser= require("cookie-parser")
const crypto = require("crypto")

const authRouter=express.Router()

authRouter.use(coockieParser())

authRouter.post("/register", async(req,res)=>{
    const { name, email ,password} = req.body

    if(!name) return res.json({
        message:"please enter name"
    })

    if(!email) return res.json({
        message: "email field is empty"
    })

    if(!password) return res.json({
        message: "password field is empty"
    })
   
    const isUserExist= await userModel.find({email})

    if(isUserExist[0]?.email == email) return res.json({
        message:"this email id is already registerd"
    })


    const hashedPassword=crypto.createHash("md5").update(password).digest("hex");

    // console.log("HashedPassword : ", hashedPassword);

    const user= await userModel.create({
        name,
        email,
        password:hashedPassword
    })
        // console.log(user)
    const token=jwt.sign({name,email} , process.env.JWT_SECRET)
    res.cookie("coockieTokenJWT",token)

    res.json({
        message:"user registerd successfuly",
        userInfo:{
            userName:user.name,
            userEmail:user.email
        },
        Jwt_Token:token
    })

})


authRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body

    if(!password) return res.json({message:"password field is empty"})
    const isUserExist =await userModel.findOne({email})
   
    if(!isUserExist){
        return res.json({
            message:"user not found"
        })
    }

    const loginPassword = crypto.createHash("md5").update(password).digest("hex")
    console.log("login pass hash :",loginPassword)
    if(isUserExist.password === loginPassword && isUserExist.email === email ){
        res.json({
            message:"login successfull...",
            loginUser: isUserExist.name
        })
    }else{
        return res.json({
            message:"inValid Caredentials"
        })
    }
})

module.exports=authRouter