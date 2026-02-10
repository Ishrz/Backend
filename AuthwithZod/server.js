const app=require("./src/app.js")
const dbConnect=require("./src/config/dbConnection.js")

const PORT=process.env.PORT || 4000


dbConnect()


app.listen(PORT,()=>{
    console.log(`server is Started on ${PORT}`)
})