import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:id");
router.put("/:id");
router.delete("/:id");
router.post("/login");
router.get("/:id/tasks");

export default router;
