import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.routes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

export default app;
