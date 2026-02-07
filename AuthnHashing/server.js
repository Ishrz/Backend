const app=require("./src/app.js")
const dbConnection= require("./src/config/databaseConnection.js")


const PORT= process.env.PORT || 4000

dbConnection()

app.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}.......`)
})