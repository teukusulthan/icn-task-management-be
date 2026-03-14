import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.routes";
import tasksRoutes from "./routes/tasks.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

export default app;
