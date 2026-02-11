const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");


async function registration(req, res){
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
}

async function signIn(req, res) {
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
}

async function getMe(req, res) {
  console.log("INside the geet-me route now first line");

  const id = req?.id;
  console.log(id);
  res.status(200).json({ message: "request successfull" });
}


module.exports={
    registration,
    signIn,
    getMe
}