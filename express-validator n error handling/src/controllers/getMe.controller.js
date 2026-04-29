

const getMe = async (req,res,next) =>{
    try{
        console.log("geMe hit")


    const {username , email ,password} = req.body

    const user = {
        username,
        email,
        password
    }


    res.status(200).json({
        message:"Hello to userprofile",
        user,
        success : true
    })

    }catch(err){
        console.log("catch hit : "  +err)
        // err.status = 409
        next(err)

    }
}


export  {
    getMe
}