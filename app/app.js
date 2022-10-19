import dotenv from "dotenv";
import nodeCron from "node-cron";
import Server from "./models/server.js";

dotenv.config();

const server = new Server();

// Connect to the DB
await server.connectToDb();

// Update the DB
await server.updateDb();

// Schedule to update the DB every day at 00:00 AM
nodeCron.schedule("0 0 0 * * *", async function () {
    await server.updateDb();
});

server.run();
