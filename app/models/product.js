import { Schema, model } from "mongoose";

const productSchema = new Schema({
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

productSchema.pre("find", function () {
    this.populate("categories");
});

productSchema.methods.toJSON = function () {
    const { __v, _id, ...product } = this.toObject();

    return product;
};

const Product = model("Product", productSchema);

export { Product };
