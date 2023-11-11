let counter = 1;
let db = [];

exports.insert = (req, res) => {
	let task = [];
	if (req.body.title) {
		task.push({
			id: counter,
			title: req.body.title,
			isCompleted: false,
		});
		counter++;
		db = db.concat(task);
		return res.status(200).json({
			id: task[0].id,
		});
	} else if (req.body.tasks) {
		req.body.tasks.forEach((post) => {
			task.push({
				id: counter,
				title: post.title,
				isCompleted: false,
			});
			counter++;
		});
		db = db.concat(task);
		return res.status(200).json({
			tasks: task.map((e) => {
				return { id: e.id };
			}),
		});
	}
	return res.status(400).json({});
};

exports.getAllTasks = (req, res) => {
	return res.status(200).json({ tasks: db });
};

exports.getOneTask = (req, res) => {
	const id = req.params.id * 1;
	const result = db.find((item) => item.id === id);
	if (!result) {
		return res.status(404).json({ error: "There is no task at that id" });
	}
	res.status(200).json({ task: result });
};

exports.deleteTask = (req, res) => {
	const id = req.params.id * 1;
	db = db.filter((item) => item.id != id);
	res.status(204).json({});
};

exports.deleteMany = (req, res) => {
	const ids = Array.from(req.body.tasks.map((e) => e.id));
	db = db.filter((item) => !ids.includes(item.id));
	res.status(204).json({});
};

exports.editTask = (req, res) => {
	const id = req.params.id * 1;
	const result = db.findIndex((item) => item.id === id);
	if (result === -1) {
		return res.status(404).json({ error: "There is no task at that id" });
	}
	db[result].title = req.body.title || db[result].title;
	db[result].isCompleted = req.body.isCompleted || db[result].isCompleted;
	res.status(204).json({});
};
