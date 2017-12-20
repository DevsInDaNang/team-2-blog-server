"use strict";

const categoryController = require("../controllers/categoryController");
const resourceRoutes = require("./resourceRoutes");

module.exports = app => {
	return resourceRoutes("/api/categories", app, categoryController);
};
