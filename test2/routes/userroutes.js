const {Router} =require('express')

// const express=require('express')
// const Router=express.Router


  Router.get("/user", (req, res) => {
    res.json({ message: "reach to server at user route" });
  });

  Router.get("/user/dashboard", (req, res) => {
    res.json({ message: "reach to server at user dashboard route" });
  });

  Router.get("/user/contact", (req, res) => {
    res.json({ message: "reach to server at user contact route" });
  });



