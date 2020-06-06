const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {

  bycrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      user.save().then(result => {
        res.status(201).json({
          message: 'User Created',
          result: result
        });
      }).catch(err => {
        res.status(500).json({
          error: err
        });
      });

    });
});   //more the number more the time more the security


router.post("/login", (req, res, next) => {




  let fetchedUser;
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }


    fetchedUser = user;
    return bycrypt.compare(req.body.password, user.password);
  }).then(result => {

    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }


    const token = jwt.sign({
      email: fetchedUser.email,
      userId: fetchedUser._id
    }, "secret_this_should_be_longer", { expiresIn: "1h", });

    console.log(token);
    res.status(200).json({
      token: token
    });

  })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });

});



module.exports = router;
