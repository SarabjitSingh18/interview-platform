import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
const app = express();  

const __dirname = path.resolve()

//middleware
app.use(express.json());
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});


const startServer = async () => {
  try {
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};


startServer();