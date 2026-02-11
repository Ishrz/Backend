const jwt = require("jsonwebtoken")


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


module.exports ={
    auth
}