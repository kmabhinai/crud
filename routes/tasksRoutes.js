const express = require("express");
const tasksController = require("./../controllers/tasksController");
const router = express.Router();

router.route("/").post(tasksController.insert);

module.exports = router;
