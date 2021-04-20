const express = require("express");
const router = express.Router();
const axios = require("axios");
const Question = require("../schemas/Question");
const auth = require("../Authentication/Auth");

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
  axios
    .post("https://mms-ml.herokuapp.com/api/", {
      text: req.body.text,
    })
    .then(function (response) {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
