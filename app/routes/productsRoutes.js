import { Router } from "express";
import { check } from "express-validator";
import {
    productsGet,
    productsPatch,
    typesGet,
} from "../controllers/productsController.js";
import {
    isPositiveNumber,
    validateFields,
} from "../middlewares/validate-fields.js";

const productsRouter = new Router();

productsRouter.get(
    "/",
    [check("type").optional().isAlpha(), validateFields],
    productsGet
);

productsRouter.patch(
    "/",
    [
        check("productId", "The productId is not a valid ID").isMongoId(),
        check("sizeId", "The sizeId is not a valid ID").isMongoId(),
        check("quantity", "The quantity must be a number").isNumeric(),
        check("quantity").custom(isPositiveNumber),
        validateFields,
    ],
    productsPatch
);

productsRouter.get("/types", typesGet);

export { productsRouter };
