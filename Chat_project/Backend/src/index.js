
import express from "express";
import dotnev from "dotenv"

import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

dotnev.config()
const app = express();


const PORT = process.env.PORT

app.use(express.json());

app.use("/api/auth", authRoutes)


app.listen(5001, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()
});