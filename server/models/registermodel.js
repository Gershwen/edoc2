const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//here we set the requirements for our register & login data
const registerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin:{
      type: Boolean,
      required: true,
  }
});

module.exports = mongoose.model("register", registerSchema);