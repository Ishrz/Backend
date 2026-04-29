import dotenv from "dotenv"
dotenv.config()

const errorHandler = async (err , req, res ,next) =>{


    const response = {
        message:"error",
        error:err.message
    }

    // console.log(process.env.NODE_ENVIROMENT)
    if(process.env.NODE_ENVIROMENT === "development"){
        response.stack = err.stack
    }

    res.status(err.status || 500 ).json(response)

}


export default errorHandler