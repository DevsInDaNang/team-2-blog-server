const resourceController = require("./resourceController");
const Category = require("../models/Category");

module.exports = resourceController(Category);
