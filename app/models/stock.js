import { Schema, model } from "mongoose";

const stockSchema = Schema({
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

const Stock = model("Stock", stockSchema);

export { Stock };
