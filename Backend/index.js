import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import gameRoute from "./route/game.route.js"; // Use default import here
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connection URI:", URI);
} catch (err) {
    console.error("Error connecting to MongoDB:", err);
}

//app.use("/games", router); // Use the router for the /games endpoint

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/games", gameRoute); // Use the gameRoute for the /games endpoint

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});