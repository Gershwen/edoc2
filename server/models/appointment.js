const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//here we set the requirements for our create appointment data
const appointmentSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  date:{
      type: String,
      required: true,
  },
  time:{
      type: String,
      required: false,
  }
});

module.exports = mongoose.model("appointment", appointmentSchema);