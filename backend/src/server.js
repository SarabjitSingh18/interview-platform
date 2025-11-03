import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express"

import {inngest,functions} from "./lib/inngest.js"
import {serve} from "inngest/express"

const app = express();  

const __dirname = path.resolve()

//middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials: true}));
app.use(clerkMiddleware())
app.use('/api/inngest',serve({client:inngest,functions}))
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
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};


startServer();