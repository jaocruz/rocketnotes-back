const { Router } = require("express");

const notesController = require("../controllers/notesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();

const NotesController = new notesController();

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", NotesController.create);
notesRoutes.get("/:id", NotesController.show);
notesRoutes.delete("/:id", NotesController.delete);
notesRoutes.get("/", NotesController.index);

module.exports = notesRoutes;