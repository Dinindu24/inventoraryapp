/* eslint-disable no-unused-vars */
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import inventoryRouter from "./routes/inventory.js";
import examRouter from "./routes/exam.js";
import supportServiceRouter from "./routes/supportService.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import upload from "express-fileupload";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
//backend is connect with frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(upload());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/user", userRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/exam", examRouter);
app.use("/api/support-service", supportServiceRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//database connection

mongoose
  .connect(
    "mongodb+srv://it22170484:1234@cluster0.dwsvueb.mongodb.net/LMS_DB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err.message));

app.listen(5000, () => {
  console.log("server is running on http://localhost:5000");
});
