import { validationResult } from "express-validator";

const isPositiveNumber = async (quantity = 0) => {
    if (!(quantity > 0)) {
        throw new Error(`The quantity must be greater than zero`);
    }
};

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

export { isPositiveNumber, validateFields };
