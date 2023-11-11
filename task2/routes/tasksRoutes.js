const express = require("express");
const tasksController = require("./../controllers/tasksController");
const router = express.Router();

router
	.route("/")
	.post(tasksController.insert)
	.get(tasksController.getAllTasks)
	.delete(tasksController.deleteMany);

router
	.route("/:id")
	.get(tasksController.getOneTask)
	.delete(tasksController.deleteTask)
	.put(tasksController.editTask);

module.exports = router;
