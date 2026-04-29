import { Router } from "express";


import {getMe} from "../controllers/getMe.controller.js"

//validatore
import {registerValidation} from "../validation/auth.validator.js"

const authRouter = Router()


authRouter.get("/me",(rq,rs,nx)=>{ console.log("/me rout hit"); nx()} , registerValidation ,getMe)





export default authRouter

