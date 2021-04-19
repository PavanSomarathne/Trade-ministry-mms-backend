const express = require("express");
const router = express.Router();
const Question = require("../schemas/Question");
const auth = require("../Authentication/Auth");
const fetch = require("node-fetch");

router.post("/new-question", function (req, res, next) {
  Question.create({
    body: req.body.question,
  })
    .then(function (item) {
      res.send(item);
    })
    .catch(next);
});

router.get("/questions", function (req, res, next) {
  Question.find({}).then(function (item) {
    res.send(item);
  });
});

router.put("/questions", function (req, res, next) {
  Question.findByIdAndUpdate(
    { _id: req.body.id },
    {
      body: req.body.message,
    }
  ).then(function () {
    Question.findOne({ _id: req.body.id }).then(function (single) {
      res.send(single);
    });
  });
});

router.delete("/questions", function (req, res, next) {
  Question.findByIdAndRemove({ _id: req.body.id }).then(function (item) {
    res.send(item);
  });
});

router.post("/developing-area", function (req, res, next) {
  let obj = {
    text: req.body.text,
  };

  fetch("https://mms-ml.herokuapp.com/api/", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  })
    .then(function (result) {
      res.send(result);
      //or possibly res.send(result), depending on what indeed responds with
    })
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
});

module.exports = router;
