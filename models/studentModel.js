import mongoose from "mongoose";

const formatDate = (date) => {
    if (!date) return null;

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
};

const studentSchema = new mongoose.Schema({

    grNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    seatNumber: {
        type: Number,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    fatherName: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
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
        get: formatDate,
    },
    placeOfBirth: {
        type: String,
    },
    dateOfAdmission: {
        type: Date,
        get: formatDate,
    },
    classInWhichAdmitted: {
        type: String,
    },
    lastSchoolAttended: {
        type: String,
    },
    dateOfLeaving: {
        type: Date,
        get: formatDate,
    },
    // ENUM????
    classFromWhichLeft: {
        type: String,
    },
    reasonOfLeaving: {
        type: String
    },
    progessInStudies: {
        type: String,
    },
    conduct: {
        type: String,
    },
    remarks: {
        type: String
    },
    // Extra information
    cnicNumber: {
        type: String,
    },
    relationWithBeneficiary: {
        type: String,
    },
    cellNumber: {
        type: String,
    },
    class: {
        type: String,
        required: true,
        trim: true,
        enum:
            [
                "ECE",
                "I (One)",
                "II (Two)",
                "III (Three)",
                "IV (Fourth)",
                "V (Fifth)",
                "VI (Sixth)",
                "VII (Seventh)",
                "VIII (Eighth)",
                "IX (Ninth)",
                "X (Tenth)",
            ]
    },
    section: {
        type: String,
        default: null,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
}, {
    versionKey: false,
    toJSON: { getters: true },
    toObject: { getters: true },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;

// new schema