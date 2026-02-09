const mongoose = require("mongoose")

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected")
    })
    .catch((err)=>{
        console.log( `database connecting failed with error : ${err}`)
    })
}


module.exports=dbConnection
