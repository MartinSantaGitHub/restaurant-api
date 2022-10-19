import { Schema, model } from "mongoose";

const sizeSchema = Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
    },
});

const Size = model("Size", sizeSchema);

export { Size };
