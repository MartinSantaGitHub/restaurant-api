import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
    },
});

categorySchema.methods.toJSON = function () {
    const { __v, _id, ...category } = this.toObject();

    return category;
};

const Category = model("Category", categorySchema);

export { Category };
