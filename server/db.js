//using mongoose to connect to mongoDB database
const mongoose = require("mongoose");
//database uri saved in .env file
const DB_URI = process.env.MONGO_DB_URI;

//connecting to the database
module.exports = async () => {
  await mongoose.connect(DB_URI);
  console.log("Connected to database.");
};
