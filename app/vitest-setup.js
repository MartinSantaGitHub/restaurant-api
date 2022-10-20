import { vi } from "vitest";

vi.mock("./models/stock.js", () => {
    const Stock = {
        find: vi.fn().mockResolvedValue([]),
        countDocuments: vi.fn().mockResolvedValue(0),
        findOne: vi.fn().mockResolvedValue({}),
    };

    return { Stock };
});

vi.mock("./models/product.js", () => {
    const Product = {
        find: vi.fn().mockResolvedValue([]),
    };

    return { Product };
});

// vi.mock("mongoose", () => {
//     const mongoose = {
//         connect: vi.fn().mockResolvedValue({}),
//     };

//     return mongoose;
// });

// vi.mock
