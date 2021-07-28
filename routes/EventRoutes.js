const express = require("express");
const router = express.Router();
const axios = require("axios");
const Event = require("../schemas/Event");
const auth = require("../Authentication/Auth");

router.post("/new", function (req, res, next) {
  Event.create({
    sector: req.body.sector,
    name: req.body.name,
    venue: req.body.venue,
    location: req.body.location,
    time: req.body.time,
    members: req.body.members,
    date: req.body.date,
    questions: req.body.questions,
  })
    .then(function (item) {
      res.send(item);
    })
    .catch(next);
});

router.get("/all", function (req, res, next) {
  Event.find({}, {}, { sort: { _id: -1 } }).then(function (item) {
    res.send(item);
  });
});

// router.put("/questions", function (req, res, next) {
//   Question.findByIdAndUpdate(
//     { _id: req.body.id },
//     {
//       body: req.body.message,
//     }
//   ).then(function () {
//     Question.findOne({ _id: req.body.id }).then(function (single) {
//       res.send(single);
//     });
//   });
// });

// router.delete("/questions", function (req, res, next) {
//   Question.findByIdAndRemove({ _id: req.body.id }).then(function (item) {
//     res.send(item);
//   });
// });

// router.post("/developing-area", function (req, res, next) {
//   axios
//     .post("https://mms-ml.herokuapp.com/api/", {
//       text: req.body.text,
//     })
//     .then(function (response) {
//       res.send(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

module.exports = router;
