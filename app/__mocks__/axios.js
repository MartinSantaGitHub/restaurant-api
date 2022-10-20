import { vi } from "vitest";

export default {
    create: vi.fn(() => ({
        get: vi.fn().mockResolvedValue({
            data: {
                data: [
                    {
                        categories: ["Test1", "Test2"],
                        items: [{ size: "Test Size 1" }],
                        description: "Test Description 1",
                        brand: "Test Brand 1",
                    },
                    {
                        categories: ["Test3", "Test4"],
                        items: [{ size: "Test Size 2" }],
                        description: "Test Description 2",
                        brand: "Test Brand 2",
                    },
                ],
            },
        }),
    })),
};
