import { describe, it, expect } from "vitest";
import request from "supertest";
import Server from "../models/server.js";
import { Stock } from "../models/stock.js";
import { Product } from "../models/product.js";

describe("productController", () => {
    it("Should get empty results -> productsGet", async () => {
        const server = new Server();
        const result = await request(server.getApp).get("/api/products");

        expect(result.statusCode).toEqual(200);
        expect(result.body.meta).toStrictEqual({ total: 0 });
    });

    it("Should get some results -> productsGet", async () => {
        Stock.find.mockImplementation(async () => [
            { product: 1 },
            { product: 2 },
        ]);

        Stock.countDocuments.mockImplementation(async () => 2);

        const server = new Server();
        const result = await request(server.getApp)
            .get("/api/products")
            .query({ type: "milk" });

        expect(result.statusCode).toEqual(200);
        expect(result.body.meta).toStrictEqual({ total: 2 });
        expect(result.body.stocks.length).toBe(2);
    });

    it("Should get bad request error (missing fields) -> productsPatch", async () => {
        const server = new Server();
        const result = await request(server.getApp).patch("/api/products");

        expect(result.statusCode).toEqual(400);
        expect(result.body.errors.length).toBe(4);
    });

    it("Should get bad request error (product does not exist) -> productsPatch", async () => {
        Stock.findOne.mockImplementation(async () => null);

        const server = new Server();
        const result = await request(server.getApp)
            .patch("/api/products")
            .send({
                productId: "635026cf60ddb7843b379bf6",
                sizeId: "635026cf60ddb7843b379bf9",
                quantity: 9,
            });

        expect(result.statusCode).toEqual(400);
        expect(result.body.message).contains("product does not exist");
    });

    it("Should get bad request error (insufficient stock) -> productsPatch", async () => {
        Stock.findOne.mockImplementation(async () => ({ stock: 5 }));

        const server = new Server();
        const result = await request(server.getApp)
            .patch("/api/products")
            .send({
                productId: "635026cf60ddb7843b379bf5",
                sizeId: "635026cf60ddb7843b379bf9",
                quantity: 9,
            });

        expect(result.statusCode).toEqual(400);
        expect(result.body.message).contains("Insufficient stock");
    });

    it("Should update results -> productsPatch", async () => {
        Stock.findOne.mockImplementation(async () => ({
            stock: 5,
            product: {
                name: "Product Test",
            },
            size: {
                description: "3 l",
            },
            updateOne: () => ({}),
        }));

        const server = new Server();
        const result = await request(server.getApp)
            .patch("/api/products")
            .send({
                productId: "635026cf60ddb7843b379bf5",
                sizeId: "635026cf60ddb7843b379bf9",
                quantity: 3,
            });

        expect(result.statusCode).toEqual(200);
        expect(result.body.quantity).toBe(3);
    });

    it("Should get results -> typesGet", async () => {
        Product.find.mockImplementation(async () => [
            { type: "cheese" },
            { type: "milk" },
        ]);

        const server = new Server();
        const result = await request(server.getApp).get("/api/products/types");

        expect(result.statusCode).toEqual(200);
        expect(result.body.meta).toStrictEqual({ total: 2 });
        expect(result.body.types.length).toBe(2);
    });
});
