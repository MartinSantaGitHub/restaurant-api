import { Schema, model } from "mongoose";

const sizeSchema = new Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
    },
});

sizeSchema.methods.toJSON = function () {
    const { __v, _id, ...size } = this.toObject();

    return size;
};

const Size = model("Size", sizeSchema);

export { Size };
