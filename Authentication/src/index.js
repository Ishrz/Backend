const express=require("express")

const app=express()

app.use(express.json())

const allUsers=[]

const getToken = ()=>{
    const options=["A","B","C","D","a","b","c","d",1,2,3,4]
    let token=''
    for(let i=0; i<options.length;i++)
    token +=options[Math.floor(Math.random()*options.length)]

    return token
}

app.post("/signin",(req,res)=>{
    const {username,password} = req.body

    allUsers.push({
        user:username,
        password:password
    })

    console.log(allUsers)
    res.status(201).json({
        message:"Congratulation your account is created"
    })
})

app.post("/signup",(req,res)=>{
        const {username,password} = req.body

        const currentUser=allUsers.find(u=> (u.user === username && u.password === password))

            if(currentUser){
                console.log("before Token",allUsers)
                const token=getToken()
                currentUser.token=token
                res.json({
                    message:"you are now login to portal",
                    token:token
                })
            }else{
                console.log("User not found")

            res.json({message:"Invalid Credential"})
        }

app.get("/me",(req,res)=>{
        const token=req.headers.token

        const currentUser=allUsers.find(u => u.token === token)

        console.group("Token check")
        console.log(currentUser)

        if(currentUser){
            res.json({
                message:"Heres your requested data",
                data:{username:currentUser.username,password:currentUser.password}
            })
        }else{
            res.json("unauhtenticated User")
        }
})
        console.log("from end of post method code: ",allUsers)
})


module.exports=app