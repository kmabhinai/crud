const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	isCompleted: {
		type: Boolean,
	},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
