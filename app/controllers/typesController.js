import { request, response } from "express";
import { Product } from "../models/product.js";

const typesGet = async (req = request, res = response) => {
    const products = await Product.find();
    let types = products.map((p) => p.type);

    types = [...new Set(types)];

    res.json({
        types,
        meta: { total: types.length },
    });
};

export { typesGet };
