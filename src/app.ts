import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.routes";
import tasksRoutes from "./routes/tasks.routes";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

console.log("CLIENT_URL:", process.env.CLIENT_URL);

app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

export default app;
