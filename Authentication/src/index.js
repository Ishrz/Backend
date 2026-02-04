const express=require("express")
const jwt=require('jsonwebtoken')


const app=express()

const JSON_SECRET="xyz123"

app.use(express.static('./public'))
app.use(express.json())

const allUsers=[]

// const getToken = ()=>{
//     const options=["A","B","C","D","a","b","c","d",1,2,3,4]
//     let token=''
//     for(let i=0; i<options.length;i++)
//     token +=options[Math.floor(Math.random()*options.length)]

//     return token
// }

app.post("/signin",(req,res)=>{
    const {username,password} = req.body

    allUsers.push({
        username:username,
        password:password
    })

    console.log(allUsers)
    res.status(201).json({
        message:"Congratulation your account is created"
    })
})

app.post("/signup",(req,res)=>{
        const {username,password} = req.body

        const currentUser=allUsers.find(u=> (u.username === username && u.password === password))

            if(currentUser){
                console.log("before Token",allUsers)

                // const token=getToken()
                // currentUser.token=token
                const token=jwt.sign({
                    ...currentUser
                },JSON_SECRET)

                res.json({
                    message:"you are now login to portal",
                    token:token
                })
            }else{
                console.log("User not found")

            res.json({message:"Invalid Credential"})
        }

        console.log("from end of post method code: ",allUsers)
        
})

const auth=(req,res,next)=>{
const token=req.headers.token

try{
    const {username}=jwt.verify(token,JSON_SECRET)

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

app.get("/me",auth,(req,res)=>{
        
 
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


module.exports=app