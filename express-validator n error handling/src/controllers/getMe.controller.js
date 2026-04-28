

const getMe = async (req,res) =>{
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
}


export  {
    getMe
}