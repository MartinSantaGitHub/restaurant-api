import { expect } from "vitest";
import { dbConnection } from "./config.js";

describe("config", () => {
    it("Should not throw error -> dbConnection", async () => {
        process.env.MONGODB_CONNSTRING = "mongodb://db";

        const result = async () => await dbConnection();

        expect(result).not.toThrow();
    });

    it("Should throw error -> dbConnection", async () => {
        process.env.MONGODB_CONNSTRING = "";

        const result = async () => await dbConnection();

        expect(result).rejects.toThrow();
    });
});
