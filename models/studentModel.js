import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

    rollNumber: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },

    class: {
        type: String,
        required: true,
        trim: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    section: {
        type: String,
        default: null,
    },
}, {
    versionKey: false,
});

const Student = mongoose.model("Student", studentSchema);
export default Student;