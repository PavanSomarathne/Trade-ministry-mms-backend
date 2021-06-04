const express = require("express");
const router = express.Router();
const axios = require("axios");
const Question = require("../schemas/Question");
const Minute = require("../schemas/Minute");
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
router.post("/new-minute", function (req, res, next) {
  Minute.create({
    body: req.body.question,
    meeting_name: req.body.name,
    meeting_date: req.body.date,
    meeting_time: req.body.time,
    meeting_venue: req.body.venue,
    present_private: req.body.private,
    present_public: req.body.public,
    present_academic: req.body.academic,
    present_association: req.body.association,
    excused: req.body.excused,
    absent: req.body.absent,
    meeting_approval_from: req.body.approval,
    meeting_motion: req.body.motion,
    meeting_motionBy: req.body.motionBy,
    meeting_proposedBy: req.body.proposedBy,
    meeting_secondedBy: req.body.secondedBy,
    meeting_objective: req.body.objective,
    meeting_activities: req.body.activities,
    meeting_remarks: req.body.remarks,
  })
    .then(function (item) {
      res.send(item);
    })
    .catch(next);
});
module.exports = router;
