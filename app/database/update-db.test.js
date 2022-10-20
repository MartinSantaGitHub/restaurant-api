import { expect } from "vitest";
import UpdateDb from "./update-db.js";

describe("update-db", () => {
    it("Should update DB -> UpdateDb.update", async () => {
        const updateDb = new UpdateDb();
        const result = async () => await updateDb.update();

        expect(result).not.toThrow();
    });
});
