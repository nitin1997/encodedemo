const express = require('express');
const User = require('../models/user');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/signup", (req, res, next) => {
      console.log("inside server add method");
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      user.save().then(result => {
        res.status(201).json({
          message: "User Created",
          result: result
        });
      })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    

});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(404).json({
          message: "Authentication Failed"
        });
      }
      fetchedUser = user;
      
      return (req.body.password===user.password)
    }).then(result => {
      if (!result) {
        return res.status(404).json({
          message: "Authentication Failed"
        });
      }
      console.log("proper data")
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "secret_for_setting_the_token", { expiresIn: "1h" });
      res.status(200).json({
         token: token,
         expireIn:3600,
        userId:fetchedUser._id
      });
    })
    .catch(err => {
      res.status(404).json({
        message: "Authentication Failed"
      });
    });
})

module.exports = router;
