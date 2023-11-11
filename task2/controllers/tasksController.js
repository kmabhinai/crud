const Task = require("./../models/taskModel");

exports.insert = async (req, res) => {
	if (req.body.title) {
		const taskIns = await Task.create({
			title: req.body.title,
			isCompleted: false,
		});
		return res.status(200).json({
			id: taskIns._id,
		});
	} else if (req.body.tasks) {
		let task = [];
		req.body.tasks.forEach((post) => {
			task.push({
				title: post.title,
				isCompleted: false,
			});
		});
		const taskIns = await Task.insertMany(task);
		return res.status(200).json({
			tasks: taskIns.map((e) => {
				return { id: e.id };
			}),
		});
	}
	return res.status(400).json({});
};

exports.getAllTasks = async (req, res) => {
	const tasks = await Task.find();
	return res.status(200).json({ tasks });
};

exports.getOneTask = async (req, res) => {
	const result = await Task.findById(req.params.id);
	if (!result) {
		return res.status(404).json({ error: "There is no task at that id" });
	}
	res.status(200).json({ task: result });
};

exports.deleteTask = async (req, res) => {
	await Task.findByIdAndDelete(req.params.id);
	res.status(204).json({});
};

exports.deleteMany = async (req, res) => {
	let ids = req.body.tasks.map((e) => e._id);
	await Task.deleteMany({ _id: { $in: ids } });
	res.status(204).json({});
};

exports.editTask = async (req, res) => {
	const result = await Task.findById(req.params.id);
	if (result === -1) {
		return res.status(404).json({ error: "There is no task at that id" });
	}
	result.title = req.body.title || result.title;
	result.isCompleted = req.body.isCompleted || result.isCompleted;
	await result.save();
	res.status(204).json({});
};
