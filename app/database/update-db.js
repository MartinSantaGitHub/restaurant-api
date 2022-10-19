import axios from "axios";
import { Category } from "../models/category.js";
import { Product } from "../models/product.js";
import { Size } from "../models/size.js";
import { Stock } from "../models/stock.js";

export default class UpdateDb {
    #productTypes;
    #baseUrl;
    #authToken;
    #requestToken;

    constructor() {
        this.#productTypes = ["milk", "water", "cheese", "meat"];
        this.#baseUrl = "https://api.kroger.com/v1";

        // Set the athorization token
        this.#setAuthToken();
    }

    get isRequestToken() {
        return this.#requestToken !== undefined;
    }

    #setAuthToken() {
        this.#authToken = Buffer.from(
            `${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`
        ).toString("base64");
    }

    async #updateCategories(item) {
        // The categories can come duplicated, that's why I filter them
        // to eliminate duplicate values.
        const categories = [...new Set(item.categories)];
        const categoryObjs = [];

        for (const categoryDescription of categories) {
            let category = await Category.findOne({
                description: categoryDescription,
            });

            if (!category) {
                const data = {
                    description: categoryDescription,
                };

                category = new Category(data);

                await category.save();
            }

            categoryObjs.push(category);
        }

        return categoryObjs;
    }

    async #updateSizes(item) {
        const sizeDescription = item.items[0].size;
        let size = await Size.findOne({
            description: sizeDescription,
        });

        if (!size) {
            const data = {
                description: sizeDescription,
            };

            size = new Size(data);

            await size.save();
        }

        return size;
    }

    async #updateProducts(item, productType, categoryObjs, size) {
        const productName = item.description;
        const productBrand = item.brand;

        let product = await Product.findOne({
            name: productName,
        });

        if (!product) {
            const data = {
                name: productName,
                brand: productBrand,
                type: productType,
                categories: categoryObjs,
                sizes: [size],
            };

            product = new Product(data);

            await product.save();
        } else {
            const newCategories = categoryObjs.filter(
                (c) => !product.categories.includes(c.id)
            );
            const newSize = !product.sizes.includes(size.id) ? [size] : [];

            product.categories.push(...newCategories);
            product.sizes.push(...newSize);

            if (newCategories.length || newSize.length) {
                await product.save();
            }
        }

        return product;
    }

    async #updateStocks(product, size) {
        const stockList = await Stock.find({ product: product.id });
        const isStockSize = stockList.some(
            (s) => s.size.toString() === size.id
        );

        if (!stockList.length || !isStockSize) {
            const data = {
                product: product,
                size: size,
                stock: 10,
            };

            const stock = new Stock(data);

            await stock.save();
        }
    }

    async setRequestToken() {
        try {
            const instance = axios.create({
                baseURL: `${this.#baseUrl}/connect/oauth2/token`,
                headers: {
                    Authorization: `Basic ${this.#authToken}`,
                    ContentType: "x-www-form-urlencoded",
                },
                params: {
                    grant_type: "client_credentials",
                    scope: "product.compact",
                },
            });

            const response = await instance.post();

            this.#requestToken = response.data.access_token;
        } catch (error) {
            console.error(
                "Error when trying to obtain the authorization token"
            );
            console.error(error);
        }
    }

    async update(isRetry = true) {
        try {
            const instance = axios.create({
                baseURL: this.#baseUrl,
                headers: {
                    Authorization: `Bearer ${this.#requestToken}`,
                },
            });

            for (const productType of this.#productTypes) {
                const response = await instance.get("/products", {
                    params: { "filter.term": productType, "filter.limit": 5 },
                });
                const { data } = response.data;

                for (const item of data) {
                    // Categories
                    const categoryObjs = await this.#updateCategories(item);

                    // Sizes
                    const size = await this.#updateSizes(item);

                    // Products
                    const product = await this.#updateProducts(
                        item,
                        productType,
                        categoryObjs,
                        size
                    );

                    // Stocks
                    await this.#updateStocks(product, size);
                }
            }

            return false;
        } catch (error) {
            if (isRetry && error.response?.status === 401) {
                return true;
            }

            throw error;
        }
    }
}
