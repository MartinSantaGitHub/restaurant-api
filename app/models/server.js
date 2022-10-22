import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import UpdateDb from "../database/update-db.js";
import { productsRouter } from "../routes/productsRoutes.js";
import { typesRouter } from "../routes/typesRoutes.js";

export default class Server {
    #port;
    #app;
    #updateDb;
    #productsPath;
    #typesPath;

    constructor() {
        this.#port = process.env.APP_PORT;
        this.#app = express();
        this.#updateDb = new UpdateDb();
        this.#productsPath = "/api/products";
        this.#typesPath = "/api/types";

        // Configure Middlewares
        this.#middlewares();

        // Configure Routes
        this.#routes();
    }

    get getApp() {
        return this.#app;
    }

    #middlewares() {
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use(express.static("public"));
    }

    #routes() {
        this.#app.use(this.#productsPath, productsRouter);
        this.#app.use(this.#typesPath, typesRouter);
    }

    async connectToDb() {
        await dbConnection();
    }

    async updateDb() {
        try {
            console.log("Start Update DB");

            if (!this.#updateDb.isRequestToken) {
                await this.#updateDb.setRequestToken();
            }

            const isUpdateRequestToken = await this.#updateDb.update();

            if (isUpdateRequestToken) {
                await this.#updateDb.setRequestToken();
                await this.#updateDb.update(false);
            }

            console.log("End Update DB");
        } catch (error) {
            console.log("Something went wrong when trying to update the DB");
            console.error(error);
        }
    }

    run() {
        this.#app.listen(this.#port, () => {
            console.log("Server running on port", this.#port);
        });
    }
}
