const express = require("express");
const auth = require("../authentication/Auth");
const router = express.Router();

const User = require("../schema/User");

router.post("/register", function (req, res, next) {
  User.create({
      utype: req.body.utype,
      name: req.body.fname,
      email: req.body.email,
      tel: req.body.tel,
      sector: req.body.sector,
      workplace: req.body.workplace,
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

module.exports = router;