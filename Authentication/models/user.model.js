const mongoose= require("mongoose")


const userSchema= mongoose.Schema({
    email:{
        type:String,
        require: true,
        unique:true
    },
    name:String,
    password:String
})


const userModel= mongoose.model("user",userSchema)

module.exports=userModel