const express = require("express");
const auth = require("../authentication/Auth");
const router = express.Router();

const User = require("../schemas/User");

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

router.delete("/register/:Cid", auth, function (req, res, next) {
  const customerId = req.params.Cid;
  User.findByIdAndRemove({
    _id: customerId,
  }).then(function (item) {
    res.send(item);
  });
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
