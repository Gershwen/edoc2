import express from "express";
import next from "next";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import url from "url";
import cluster from "cluster";
import os from "os";
import "dotenv/config";
import appointments from "./routes/appointments.js";
import connectDB from "./db.js";


const numCPUs = os.cpus().length;
const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1); // Exit on DB connection failure
  }
})();

// 🔹 Multi-process cluster setup (only in production)
// if (!dev && cluster.isPrimary) {
  if (!dev && cluster.isPrimary && process.env.ENABLE_CLUSTER === "true") {
  console.log(`🚀 Node cluster master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `❌ Worker ${worker.process.pid} exited with code ${code}, signal ${signal}`
    );
  });
} else {
  const nextApp = next({ dir: ".", dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    const app = express();

    // 🔹 Enforce HTTPS (only in production, and only if request is HTTP)
    if (!dev) {
      app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"] !== "https") {
          return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        res.set("Strict-Transport-Security", "max-age=31557600"); // One-year HSTS
        next();
      });
    }

    // 🔹 Serve static files
    app.use(
      "/public",
      express.static(path.resolve("public"), {
        maxAge: dev ? "0" : "365d",
      })
    );

    // 🔹 Middleware setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    // 🔹 API Routes
    app.use("/api/appointments", appointments);

    // 🔹 Catch-all route for Next.js pages
    app.get("*", (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    // 🔹 Start server
    app.listen(PORT, "0.0.0.0", () => { // Explicitly binding to all network interfaces
      console.log(`🚀 Server ready and listening on port ${PORT}`);
    });
  
  });
}
