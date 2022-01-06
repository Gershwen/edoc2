//imprting the model for the appointment
const Appointment = require("../models/appointment");
//importing register model
const Register = require("../models/registermodel");
//using bcrypt to encrypt users password to store safely on the database
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//jwt key stored inside .env file for added security
const SECRET_KEY = process.env.JWT_SECRET;

//POST which handles whenever a new user registers
router.post("/register", async (req, res) => {
  try {
    //hashedPassword gets the password from the register form and encrypts it 10 times with bcrypt to produce a hash
    //the hashedPassword can be safely stored on the database.
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //the username comes from the body of the post request made by the registration form
    const username = req.body.username;
    //the admin value comes from the body of the post request made by the registration form
    const admin = req.body.admin;

    //the data gets saved to the database with the below method and gets stored in the
    //variable register.
    //this variable gets passed back to the client side with res.send(register)
    const register = await new Register({
      username: username,
      password: hashedPassword,
      admin: admin,
    }).save();

    res.send(register);
  } catch (error) {
    res.send(error);
  }
});

//POST which handles whenever a existing user logs in
router.post("/login", async (req, res) => {
  //username that comes from the client side gets stored in the usr variable
  const usr = req.body.username;
  //password that comes from the client side gets stored in the pwd variable
  const pwd = req.body.password;

  //below the database gets searced with the usr variable
  const user = await Register.findOne({
    username: usr,
  });
  //the boolean value of the admin recieved from the database gets stored in the
  //below variable.
  const admintype = user.admin;

  try {
    //this asynchronous function 1st gets the password from the login page and encrypts it with
    //bcrypt then compares it with the stored hashed password in the database.
    const match = await bcrypt.compare(pwd, user.password);

    //this condition checks the match variable. and if theres a password match the payload is created.
    //the payload holds two sets of data, the username and whether admin is true or false
    if (match) {
      payload = {
        name: usr,
        admin: user.admin,
      };

      //the jwt is then created using the payload and secret key
      const token = jwt.sign(JSON.stringify(payload), SECRET_KEY, {
        algorithm: "HS256",
      });

      res.send({ token: token, admin: admintype });
    } else {
      res.status(403).send({ err: "Incorrect login!" });
    }
  } catch (error) {
    console.log(error);
  }
});

//POST handles when a new appointment is created(only for admin)
router.post("/", async (req, res) => {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  //jwt token recieved from post is 1st verified
  const decoded = jwt.verify(token, SECRET_KEY);

  try {
    //if the jwt indicates that the admin value is true then the save method will run
    if (decoded.admin == true) {
      const appointment = await new Appointment(req.body).save();
      res.send(appointment);
    } else {
      res
        .status(403)
        .send({ msg: "Your JWT was verified, but you are not an admin." });
    }
  } catch (error) {
    res.send(error);
  }
});

//GET handles displaying the appointments.
//this is available to both admin and doctor
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.send(appointments);
  } catch (error) {
    res.send(error);
  }
});

//PUT handles finding a appoinment by its id and updates it
router.put("/:id", async (req, res) => {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  //jwt token recieved from put is 1st verified
  const decoded = jwt.verify(token, SECRET_KEY);

  try {
    //if the jwt indicates that the admin value is true then the update will run
    if (decoded.admin == true) {
      const appointment = await Appointment.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.send(appointment);
    } else {
      res
        .status(403)
        .send({ msg: "Your JWT was verified, but you are not an admin." });
    }
  } catch (error) {
    res.send(error);
  }
});

//DELETE finds a appoinment by id and removes it
router.delete("/:id", async (req, res) => {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  //jwt token recieved from put is 1st verified
  const decoded = jwt.verify(token, SECRET_KEY);

  try {
    if (decoded.admin == true) {
      //if the jwt indicates that the admin value is true then the delete will run
      const appointment = await Appointment.findByIdAndDelete(req.params.id);
      res.send(appointment);
    } else {
      res
        .status(403)
        .send({ msg: "Your JWT was verified, but you are not an admin." });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
