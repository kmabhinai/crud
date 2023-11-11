const express = require("express");
const morgan = require("morgan");

const app = express();

const tasksRouter = require("./routes/tasksRoutes");

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/v1/tasks", tasksRouter);
app.all("*", (req, res) => {
	res.status(404).json({
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});
module.exports = app;
