import express from "express";
import { GoalController } from "../controllers/goalController.js";

const router = express.Router();

router.get("/", GoalController.getAll);
router.get("/:id", GoalController.getById);
router.post("/", GoalController.create);
router.put("/:id", GoalController.update);
router.delete("/:id", GoalController.remove);

export default router;
