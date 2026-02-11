const express = require("express");
const {registration, signIn, getMe} = require("../controllers/auth.controller.js")
const {auth} = require("../middlewares/auth.middeware.js")

const authRouter = express.Router();


//registration endpoint
authRouter.post("/register", registration );

//signin/login endpoint
authRouter.post("/signin", signIn);

//get-me endpoitn
authRouter.get("/get-me", auth, getMe );

module.exports = authRouter;
