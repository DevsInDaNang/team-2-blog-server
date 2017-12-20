"use strict";

const express = require("express");

module.exports = (endpointUrl, app, controller) => {
	let router = express.Router();

	router.get("/", controller.getAll);
	router.post("/", controller.addObject);
	router.get("/:id", controller.getAnObject);
	router.put("/:id", controller.updateAnObject);
	router.delete("/:id", controller.deleteAnObject);

	app.use(endpointUrl, router);
};
