import { afterEach, beforeEach, expect, vi } from "vitest";
import { dbConnection } from "./config.js";

describe("config", () => {
    const env = process.env;

    beforeEach(() => {
        vi.resetModules();

        process.env = { ...env };
    });

    afterEach(() => {
        process.env = env;
    });

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
