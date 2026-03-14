import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/my-tasks");
router.get("/:id");
router.put("/:id");
router.delete("/:id");

export default router;
