import { Schema, model } from "mongoose";

const stockSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    },
    size: {
        type: Schema.Types.ObjectId,
        ref: "Size",
        required: [true, "Size is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
    },
});

stockSchema.pre(["find", "findOne"], function () {
    this.populate("product size");
});

stockSchema.methods.toJSON = function () {
    const { __v, _id, ...stock } = this.toObject();
    const { __v: __v2, sizes, ...product } = stock.product;
    const { __v: __v3, ...size } = stock.size;
    const categories = stock.product.categories.map((c) => c.description);

    product.categories = categories;
    stock.product = product;
    stock.size = size;

    return stock;
};

const Stock = model("Stock", stockSchema);

export { Stock };
