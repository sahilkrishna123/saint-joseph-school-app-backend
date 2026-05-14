import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

// Env variables
dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
    console.log("UnCAUGHT EXCEPTION! 💥 Shutting Down...");
    console.log(err.name, err.message);
    process.exit(1);
});


// Database Config
const DB = process.env.DATABASE_STRING;
// console.log(DB);
mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Successful!!!"))
  .catch((err) => {
    console.log("DB ERROR:", err);
  });
// App Listening
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
