import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "Title is required"],
    },
    brand: {
        type: String,
    },
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
    ],
    sizes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Size",
            required: [true, "Size is required"],
        },
    ],
});

const Product = model("Product", productSchema);

export { Product };
