import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Class from "../models/classModel.js";
import mongoose from "mongoose";

export const createClass = catchAsync(async (req, res, next) => {
    const newData = req.body;
    const newClass = await Class.create(newData);

    res.status(201).json({
        status: "success",
        data: {
            data: newClass
        },
    });
});

// GET ONE
export const getOneClass = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid class ID", 400));
    }

    const getClass = await Class.findById(id);

    if (!getClass) {
        return next(new AppError("Class not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            data: getClass,
        },
    });
});

// GET ALL
export const getAllClasses = catchAsync(async (req, res, next) => {
    const classes = await Class.find();

    res.status(200).json({
        status: "success",
        results: classes.length,
        data: {
            data: classes,
        },
    });
});

// UPDATE
export const updateClass = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid class ID", 400));
  }

  const updatedClass = await Class.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedClass) {
    return next(new AppError("Class not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: updatedClass,
    },
  });
});


// DELETE
export const deleteClass = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid class ID", 400));
  }

  const deletedClass = await Class.findByIdAndDelete(id);

  if (!deletedClass) {
    return next(new AppError("Class not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});