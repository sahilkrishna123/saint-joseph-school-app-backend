// import multer from "multer";
// import sharp from "sharp";
import mongoose from "mongoose";
// Import Utils
import  {catchAsync} from "../utils/catchAsync.js";
// import * as factory from "./handlerFactory.js";
import AppError from "../utils/appError.js";

// Import models
import Student from "../models/studentModel.js";
// import User from "../models/userModel.js";

// import SchoolApproval from "../models/schoolApprovals.js";
// import School from "../models/schoolModel.js";

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images.", 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// export const uploadUserPhoto = upload.single("photo");

// export const resizeUserPhoto = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);

//   next();
// });

export const getDashboard = catchAsync(async (req, res, next) => {
    const user = req.user;

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
export const updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                "This route is not for password updates. Please use /updateMyPassword.",
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email");
    if (req.file) filteredBody.photo = req.file.filename;
    // console.log(req.file.filename);
    console.log(filteredBody.photo);

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        returnDocument: 'after',
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});

export const deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const completeProfile = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                "This route is not for password updates. Please use /updateMyPassword.",
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = { ...req.body };
    if (filteredBody.role) delete filteredBody.role;
    delete filteredBody.email;

    // const filteredBody = filterObj(req.body, "name", "email");
    if (req.file) filteredBody.photo = req.file.filename;
    // console.log(req.file.filename);
    // console.log(filteredBody.photo);
    // console.log(filteredBody);

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });


});
// export const getUser = factory.getOne(User);


export const createStudent = catchAsync(async (req, res, next) => {
    const newData = req.body;
    const student = await Student.create(newData);

    res.status(201).json({
        status: "success",
        data: {
            data: student,
        },
    });
});
export const getOneStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id).populate("classId");
    const formattedStudent = {
        ...student._doc,
        dateOfBirth: student.dateOfBirth
            ? student.dateOfBirth.toISOString().split("T")[0]
            : null,
    };
    res.status(200).json({
        status: "success",
        data: {
            data: formattedStudent,
        },
    });
});
export const getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find().populate("classId");

  const formattedStudents = students.map((student) => ({
    ...student._doc,
    dateOfBirth: student.dateOfBirth
      ? student.dateOfBirth.toISOString().split("T")[0]
      : null,
  }));

  res.status(200).json({
    status: "success",
    data: {
      data: formattedStudents,
    },
  });
});
// UPDATE
export const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid student ID", 400));
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate("classId");

  if (!updatedStudent) {
    return next(new AppError("Student not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: updatedStudent,
    },
  });
});
// DELETE
export const deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid student ID", 400));
  }

  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return next(new AppError("Student not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
