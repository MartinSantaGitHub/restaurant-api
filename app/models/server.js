import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";

export default class Server {
    #port;
    #app;

    constructor() {
        this.#port = process.env.APP_PORT;
        this.#app = express();

        // Connect to the DB
        this.#connectToDb();

        // Configure Middlewares
        this.#middlewares();

        // Configure Routes
        this.#routes();
    }

    async #connectToDb() {
        await dbConnection();
    }

    #middlewares() {
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use(express.static("public"));
    }

    #routes() {}

    run() {
        this.#app.listen(this.#port, () => {
            console.log("Server running on port", this.#port);
        });
    }
}
