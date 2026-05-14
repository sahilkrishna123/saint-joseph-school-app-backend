import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        hasSections: {
            type: Boolean,
            default: false,
        },
        sections: [
            {
                type: String,
            },
        ],
    },
    {
        versionKey: false,
    }
);

const Class = mongoose.model("Class", classSchema);
export default Class;