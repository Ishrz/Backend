import { Router } from "express";
import {body , validationResult } from "express-validator"

import {getMe} from "../controllers/getMe.controller.js"

const authRouter = Router()


authRouter.get("/me" , 
    [
        body("username").isString().withMessage("username should be string") ,
        body("email").isEmail().withMessage("give proper email address"),
        body("password").isInt().withMessage("password should be number"),
        (req,res,next) =>{
            const error = validationResult(req)
            if(!error.isEmpty()){

                res.json({
                    error:error.errors
                })
            }

            next()
          
        }
    ],
    getMe)





export default authRouter

