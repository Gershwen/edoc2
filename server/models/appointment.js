import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define appointment schema
const appointmentSchema = new Schema({
  fname: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from input
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date, // Change to Date for better handling
    required: true,
  },
  time: {
    type: String, // Keep as String but validate format
    required: false,
    validate: {
      validator: function (v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v); // Validates HH:MM format
      },
      message: (props) => `${props.value} is not a valid time format (HH:MM)!`,
    },
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export default mongoose.model("appointment", appointmentSchema);
