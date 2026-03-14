import { Router } from "express";
import {
  createTask,
  getTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", getTasks);
router.get("/my-tasks", authMiddleware, getMyTasks);
router.get("/:id", getTaskById);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
