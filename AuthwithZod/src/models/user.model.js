const mongoose = require("mongoose")


const userschema= mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:String
})


const userModel= mongoose.model("users",userschema)


module.exports=userModel