import { Schema, model } from "mongoose";

const categorySchema = Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
    },
});

const Category = model("Category", categorySchema);

export { Category };
