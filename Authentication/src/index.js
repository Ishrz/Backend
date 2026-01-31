const express=require("express")

const app=express()

app.use(express.json())

const allUsers=[]


app.post("/signin",(req,res)=>{
    const {username,password} = req.body

    allUsers.push({
        user:username,
        password:password
    })

    console.log(allUsers)
    res.status(201).json("Congratulation your successfully signed-in")
})

app.post("/signup",(req,res)=>{
        const {username,password} = req.body

        if(allUsers.find(u=> (u.user === username && u.password === password))){

                console.log(allUsers)


            res.json("your are a authenticate person")
        }else{

                console.log(allUsers)


            res.json("you are not authenticate person")
        }
})


module.exports=app