// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// //here we set the requirements for our register & login data
// const registerSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   admin:{
//       type: Boolean,
//       required: true,
//   }
// });

// module.exports = mongoose.model("register", registerSchema);


// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const bcrypt = require("bcrypt");
// import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const registerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate usernames
      trim: true, // Remove extra spaces
      lowercase: true, // Convert to lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Enforce strong passwords
    },
    admin: {
      type: Boolean,
      default: false, // Default is non-admin
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

// // 🔒 Hash password before saving
// registerSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // Only hash if changed
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // ✅ Compare password for login authentication
// registerSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", registerSchema);
export default mongoose.model("register", registerSchema);

