const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const usersController = require("../controllers/usersController");
const userAvatarController = require("../controllers/userAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const UsersController = new usersController();
const UserAvatarController = new userAvatarController();

usersRoutes.post("/", UsersController.create);
usersRoutes.put("/", ensureAuthenticated, UsersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), UserAvatarController.update)

module.exports = usersRoutes;