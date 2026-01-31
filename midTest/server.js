const app=require("./src/index.js")



const PORT =process.env.PORT || 6000








app.listen(PORT,()=>{
    console.log(`server is created at ${PORT}`)
})