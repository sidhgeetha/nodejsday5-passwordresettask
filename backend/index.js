import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import userRouter from "./Routers/user.router.js";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: [
      "https://main--storied-sable-0b88a3.netlify.app",
      "https://nodejsday5-passwordresettask.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("App is lestening in the port", port);
});
