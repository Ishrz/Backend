const app=require('./index')
const dbConnection=require('./utils/db/db.js')




dbConnection()

app.listen(3000,()=>{
    console.log("server is created")
})