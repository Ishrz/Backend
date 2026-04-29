//lib
import express from "express"

//routes
import authRouter from "./routes/auth.route.js"

//middlewares
import errorHandler from "./middlewares/error.middleware.js"

const app = express()

app.use(express.json())


app.use("/api/v1/auth" , authRouter)




app.use(errorHandler)


export default app