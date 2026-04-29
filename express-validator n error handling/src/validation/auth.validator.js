import { body ,validationResult } from "express-validator";



const validator =async (req,res,next ) =>{

    const result = validationResult(req)

    if(!result.isEmpty()){
        return res.json({
            message: result.array()
        })
    }

    return next()
}



export const registerValidation =
    [
        body("username").isString().isLength({min:4 , max:8}).withMessage("username should be string with min 4 and max 8 character"),
        body("email").isEmail().withMessage("provide valid email id"),
        body("password").isInt().isLength({min:3 ,max:5}).withMessage("provide strong password with min3 and max 5 characters"),

        validator
    ]
