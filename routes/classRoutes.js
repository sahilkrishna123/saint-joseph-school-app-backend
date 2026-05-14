import express from "express";
import * as authController from "../controllers/authController.js";
import * as classController from "../controllers/classController.js";

const router = express.Router();

router
  .route("/")
  .post(authController.protect, authController.restrictTo('admin'), classController.createClass)
  .get(authController.protect, classController.getAllClasses);

router
  .route("/:id")
  .get(authController.protect, classController.getOneClass)
  .patch(authController.protect, authController.restrictTo('admin'), classController.updateClass)
  .delete(authController.protect, authController.restrictTo('admin'), classController.deleteClass);

export default router;