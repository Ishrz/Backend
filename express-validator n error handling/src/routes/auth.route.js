import { Router } from "express";

import {getMe} from "../controllers/getMe.controller.js"

const authRouter = Router()


authRouter.get("/me" , getMe)





export default authRouter

