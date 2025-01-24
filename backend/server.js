import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import yarnRouter from "./routes/yarnRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use("/api/yarn", yarnRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
