import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  getUserTasks,
} from "../controllers/users.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.get("/:id/tasks", getUserTasks);

export default router;
