const express=require("express")
const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")

const userRoute=express.Router()


// const allUsers=[]


userRoute.post("/signup", async(req,res)=>{
    const {email,password,name} = req.body

    // allUsers.push({
    //     username:username,
    //     password:password
    // })

    const createdUser=await userModel.create({
        name,
        email,
        password
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
            console.log(user)
            if(user){


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
const token=req.headers.token

try{
    const {username}=jwt.verify(token,process.env.JWT_SECRET)

    if(username){
        req.username=username
        next()
    }else{
        res.json("not authenticated user")
    }
}catch(err){
    console.log(`Error : ${err}`)
}


}

userRoute.get("/me",auth,(req,res)=>{
        
 
        const username=req.username
        const currentUser=allUsers.find(u => u.username === username)

        console.group("Token check")
        console.log(currentUser)

        if(currentUser){
            res.json({
                message:"Heres your requested data",
                data:{username:currentUser.username},
                // token:decodedToken
            })
        }else{
            res.json("unauhtenticated User")
        }
})


module.exports= userRoute