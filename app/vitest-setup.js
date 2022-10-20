import { vi } from "vitest";

vi.mock("./models/stock.js", () => {
    const Stock = {
        find: vi.fn().mockResolvedValue([{ size: "" }]),
        countDocuments: vi.fn().mockResolvedValue(0),
        findOne: vi.fn().mockResolvedValue({}),
    };

    return { Stock };
});

vi.mock("./models/product.js", () => {
    const Product = {
        find: vi.fn().mockResolvedValue([]),
        findOne: vi.fn().mockResolvedValue({
            name: "",
            brand: "",
            type: "",
            categories: [],
            sizes: [],
            save: async () => 0,
        }),
    };

    return { Product };
});

vi.mock("./models/category.js", () => {
    const Category = {
        findOne: vi.fn().mockResolvedValue({
            description: "",
            id: "",
            save: async () => 0,
        }),
    };

    return { Category };
});

vi.mock("./models/size.js", () => {
    const Size = {
        findOne: vi.fn().mockResolvedValue({
            description: "",
            id: "",
            save: async () => 0,
        }),
    };

    return { Size };
});

vi.mock("axios");
