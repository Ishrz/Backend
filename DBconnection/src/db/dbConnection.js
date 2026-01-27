const mongoose=require('mongoose')


const dbConnection= ()=>{
    mongoose.connect("mongodb+srv://tanmay7331_db_user:sBbO1YjAm5upb5mk@cluster0.vff7ur0.mongodb.net/TestDBconnection")
    .then(()=>{
        console.log("Database is connected")
    })
}

module.exports=dbConnection