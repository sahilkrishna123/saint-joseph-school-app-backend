import express from "express";
import * as authController from "../controllers/authController.js";
import * as studentController from "../controllers/studentController.js";

const router = express.Router();

router.route("/")
  .post(authController.protect, authController.restrictTo('admin'), studentController.createStudent)
  .get(authController.protect, authController.restrictTo('admin'), studentController.getAllStudents);

router
  .route("/:id")
  .get(authController.protect, authController.restrictTo('admin'), studentController.getOneStudent)
  .patch(authController.protect, authController.restrictTo('admin'), studentController.updateStudent)
  .delete(authController.protect, authController.restrictTo('admin'), studentController.deleteStudent);

export default router;
