const { Router } = require("express");

const tagsController = require("../controllers/tagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const TagsController = new tagsController();

tagsRoutes.get("/", ensureAuthenticated, TagsController.index);

module.exports = tagsRoutes;