const mongoose=require("mongoose")
require('dotenv').config()

const dbConnection= async ()=>{
    mongoose.connect(process.env.MongoDBUri)
    .then(()=>{
        console.log("DB connected....")
    })
    .catch(err=>{
        console.log(`Error Connecting to DB Error: ${err} `)
    })

    // console.log(process.env.MongoDBUri)
}

module.exports=dbConnection