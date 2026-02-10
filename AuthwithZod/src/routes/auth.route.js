const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const registrationSchema = z.object({
    name: z.string().toLowerCase().min(3).max(15),
    email: z.string().toLowerCase().email(),
    password: z.string().min(5).max(10),
  });

  const parseData = registrationSchema.safeParse({ name, email, password });

  if (!parseData.success) {
    res.json({ error: parseData.error.flatten() });
  }


  try {
    const { email, name, password } = parseData.data;

    const userCheck = await userModel.findOne({ email });

    if (userCheck?.email == email)
      return res.json(`User already registered with this email id :${email}`);

    const hashPass = await bcrypt.hash(password, 5);
    // console.log(hashPass);
    const user = userModel.create({
      name,
      email,
      password: hashPass,
    });

    res.status(201).json({
      message: "You are registered sucessfully",
    });
  } catch (err) {
    res.json({ message: `something went wrong, error :${err}` });
    console.log(`Error : ${err}`);
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().max(15).min(5)
  })

const parsedLoginData=loginSchema.safeParse({email,password})

if(!parsedLoginData.success) return res.json({
    error: parsedLoginData.error.flatten()
})


  try {
    const {email,password} = parsedLoginData.data
    const user = await userModel.findOne({ email });

    if (!user) return res.json("incorrect email id");

    const hashPass = await bcrypt.compare(password, user.password);
    // console.log(hashPass)
    if (hashPass && user.email == email) {
      const token = jwt.sign(
        { name: user.name, id: user._id },
        process.env.JWT_SECRETE
      );

      res.cookie("jwtToken", token);

      res.status(200).json({
        message: `welcome ${user.name} your are login on portal`,
      });
    } else {
      return res.json({
        message: "Wrong credentials",
      });
    }
  } catch (err) {
    res.json("something went wrong");
    console.log(`Error : ${err}`);
    return;
  }
});

const auth = async (req, res, next) => {
  console.log("inside the auth route");
  const { jwtToken } = req.cookies;

  // console.log(jwtToken)
  try {
    const jwtCheck = jwt.verify(jwtToken, process.env.JWT_SECRETE);

    console.log(jwtCheck);
    req.id = jwtCheck.id;
    next();
  } catch (err) {
    console.log(`something went wrong at auth middleware`);
    res.json("something went wrong please try again");
  }
  next();
};

authRouter.get("/get-me", auth, async (req, res) => {
  console.log("INside the geet-me route now first line");

  const id = req?.id;
  console.log(id);
  res.status(200).json({ message: "request successfull" });
});

module.exports = authRouter;
