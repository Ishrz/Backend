const app=require("./src/app")
const dbConnection=require("./src/config/databaseConnection")
 require("dotenv").config()

const PORT= process.env.PORT || 4000



dbConnection()

app.listen(PORT,()=>{
    console.log(`server is started at port ${PORT}`)
})