const express = require("express");
const auth = require("../authentication/Auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();

//DB models
const User = require("../schemas/User");

//JWT
const accessTokenSecret = process.env.TOKEN_SECRET;

router.post("/register", async function (req, res, next) {
  const validEmail = await User.findOne({ email: req.body.email });
  if (validEmail) {
    return res.json({
      error: "This Email is already registered in the system",
    });
  }
  User.create({
    utype: req.body.utype,
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel,
    sector: req.body.sector,
    workplace: req.body.workplace,
    gender: req.body.gender,
    password: genPassword(),
  })
    .then(function (item) {
      res.send(item);
    })
    .catch(next);
});

router.get("/register", function (req, res, next) {
  User.find({}).then(function (item) {
    res.send(item);
  });
});

router.get("/register/public", function (req, res, next) {
  User.find({ sector: "Public" }).then(function (item) {
    res.send(item);
  });
});

router.get("/register/private", function (req, res, next) {
  User.find({ sector: "Private" }).then(function (item) {
    res.send(item);
  });
});

router.get("/register/association", function (req, res, next) {
  User.find({ sector: "Association" }).then(function (item) {
    res.send(item);
  });
});

router.get("/register/academic", function (req, res, next) {
  User.find({ sector: "Academic" }).then(function (item) {
    res.send(item);
  });
});

router.delete("/register/:Cid", auth, function (req, res, next) {
  const customerId = req.params.Cid;
  User.findByIdAndRemove({
    _id: customerId,
  }).then(function (item) {
    res.send(item);
  });
});

router.post("/login", async function (req, res) {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.utype },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.json({ error: "Username or password incorrect" });
  }
});

function genPassword() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports = router;
