const express=require("express")
const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")
const crypto= require("crypto")

const userRoute=express.Router()


// const allUsers=[]


userRoute.post("/signup", async(req,res)=>{
    const {email,password,name} = req.body



    console.log(hashPass)
    const createdUser=await userModel.create({
        name,
        email,
        password: crypto.createHash("md5").update(password).digest("hex")
    })

    res.status(201).json({
        message:"Congratulation your account is created"
    })
})

userRoute.post("/signin",async(req,res)=>{
        const {email,password} = req.body

        // const currentUser=allUsers.find(u=> (u.username === username && u.password === password))


        try{
        const user=await userModel.findOne({email})

            if(!user){
                return res.json({message:"user not found"})
            }

            const hashPass= crypto.createHash("md5").update(password).digest("hex")
            if(email === user.email && hashPass== user.password){


                const token=jwt.sign({
                    id:user._id,
                    email:user.email

                }, process.env.JWT_SECRET)

                res.header("Authorization",token)
                

                res.json({
                    message:"you are now login to portal",
                    token:token
                })
            }else{
                console.log("User not found")

            res.json({message:"Invalid Credential"})
            }
        }catch(err){
            console.log(`user not in db error occure : ${err}`)
        }
        
})

const auth=(req,res,next)=>{
const token=req.headers.authorization
console.log(token)
try{
    const {id}=jwt.verify(token,process.env.JWT_SECRET)

    console.log(id)
    if(id){
        req.id=id
        next()
    }else{
        res.json("not authenticated user")
    }
}catch(err){
    console.log(`Error : ${err}`)
}


}

userRoute.get("/me",auth,async(req,res)=>{
        
 
        const id=req.id
            console.log(id)

        // const currentUser=allUsers.find(u => u.username === username)

        try{
        const user=await userModel.findById(id)


        if(!user){
            return res.json({message:"unauthenticate user"})
        }

        if(user){
            res.json({
                message:"Heres your requested data",
                data:{name:user.name, email:user.email},
                // token:decodedToken
            })
        }
        }catch(err){
            console.log(`user not found`)
            res.json({message:"unauhtenticated User"})
        }
        
})


module.exports= userRoute