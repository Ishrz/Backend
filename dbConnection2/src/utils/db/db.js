const mongoose=require('mongoose')


const dbConnection= ()=>{

    mongoose.connect("mongodb+srv://tanmay7331_db_user:sBbO1YjAm5upb5mk@cluster0.vff7ur0.mongodb.net/Database2")
    .then(()=>{
        console.log("Database connected Succesfully");
    })
    .catch((err)=>{
        console.log(`Database connection failed with error : ${err}`)
    })
    
}

module.exports=dbConnection