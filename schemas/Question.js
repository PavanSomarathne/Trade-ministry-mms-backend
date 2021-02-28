const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const question = new Schema({
  body: {
    type: String,
  },
});

const Place = mongoose.model("question", question);
module.exports = Place;
