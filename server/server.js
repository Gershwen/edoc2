//express is used as the customer server
const express = require("express");
//next is required to link to express
const next = require("next");
//body-parser is used to collect data from the frontends forms
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const url = require("url");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
//the port is not hardcoded so that it can be assigned a port number during deployment
const PORT = process.env.PORT || 3000;
//allows to access secret keys inside .env file
require("dotenv").config();

const appointments = require("./routes/appointments");
const dev = process.env.NODE_DEV !== "production";
//making a distiction with nextApp and express's use of app to avoid confusion
// const nextApp = next({ dev });
//configuring next.js to handle requests
// const handle = nextApp.getRequestHandler();
//importing the connection from db.js
const connection = require("./db");
//calling the connection to database function here
connection();

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const nextApp = next({ dir: ".", dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    //adding express code below
    const app = express();

    if (!dev) {
      // Enforce SSL & HSTS in production
      app.use(function (req, res, next) {
        var proto = req.headers["x-forwarded-proto"];
        if (proto === "https") {
          res.set({
            "Strict-Transport-Security": "max-age=31557600", // one-year
          });
          return next();
        }
        res.redirect("https://" + req.headers.host + req.url);
      });
    }

    // Static files
    // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
    app.use(
      "/public",
      express.static(path.join(__dirname, "public"), {
        maxAge: dev ? "0" : "365d",
      })
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use("/api/appointments", appointments);

    // app.get("*", (req, res) => {
    //   return nextHandler(req, res); // for all the react stuff
    // });

    // Default catch-all renders Next app
    app.get("*", (req, res) => {
      // res.set({
      //   'Cache-Control': 'public, max-age=3600'
      // });
      const parsedUrl = url.parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`ready at http://localhost:${PORT}`);
    });
  });
}
