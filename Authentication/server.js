const app=require("./src/index.js")
const dbConnection = require("./config/dbConnection.js")
const PORT= process.env.PORT || 4000


dbConnection()

app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT}.....`)
})