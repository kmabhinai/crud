const dotenv = require("dotenv");
const mongoose = require("mongoose");
process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then((con) => console.log("Db connected"));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
	console.log(`App is running on the port ${port}`);
});

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
