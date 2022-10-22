import { describe } from "vitest";
import request from "supertest";
import { Product } from "../models/product";
import Server from "../models/server";

describe("typesController", () => {
    it("Should get results -> typesGet", async () => {
        Product.find.mockImplementation(async () => [
            { type: "cheese" },
            { type: "milk" },
        ]);

        const server = new Server();
        const result = await request(server.getApp).get("/api/types");

        expect(result.statusCode).toEqual(200);
        expect(result.body.meta).toStrictEqual({ total: 2 });
        expect(result.body.types.length).toBe(2);
    });
});
