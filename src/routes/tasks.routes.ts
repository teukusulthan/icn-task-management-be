import { Router } from "express";
import {
  createTask,
  getTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/my-tasks", getMyTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
