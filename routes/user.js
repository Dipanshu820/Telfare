// Local module
const userController = require("../Controller/user");
// External module
const express = require("express");
const userRouter = express.Router();

userRouter.get("/", userController.getHomePage);
userRouter.post("/details", userController.getDetailsPage);
userRouter.get("/profile", userController.getProfilePage);
userRouter.get("/support", userController.getSupportPage);
userRouter.get("/help", userController.getHelpPage);
userRouter.get("/feedback", userController.getFeedbackPage);

module.exports = userRouter;
