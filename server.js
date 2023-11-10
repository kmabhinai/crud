const dotenv = require("dotenv");

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App is running on the port ${port}`);
});

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
