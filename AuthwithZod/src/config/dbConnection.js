const mongoose = require('mongoose')


const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log(`database connected`)
    })
    .catch((err)=>{
        console.log(`Error connecting to Database error : ${err} `)
    })
}

module.exports=dbConnect