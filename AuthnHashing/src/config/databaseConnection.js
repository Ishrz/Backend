require("dotenv").config()

const mongoose = require("mongoose")


const dbConnection = async ()=>{
        mongoose.connect(process.env.MONGODB_URI+"authnhash")
        .then(()=>{
                console.log(`Database is connected to server.....`)
        })
}

module.exports=dbConnection