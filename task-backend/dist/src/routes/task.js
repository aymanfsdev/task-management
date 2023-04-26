import express from "express";
import { TaskController } from "../controllers/task.js";
const router = express.Router();
const controller = new TaskController();
const { getTasks, addTask, deleteTask, updateTask } = controller;
router.route('/').get(getTasks).post(addTask);
router.route('/:id').delete(deleteTask).patch(updateTask);
export default router;
//# sourceMappingURL=task.js.map