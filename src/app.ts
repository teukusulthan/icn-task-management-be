import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

export default app;
