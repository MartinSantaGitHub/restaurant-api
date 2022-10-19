import dotenv from "dotenv";
import Server from "./models/server.js";

dotenv.config();

const server = new Server();

// Connect to the DB
await server.connectToDb();

// Update the DB
await server.updateDb();

//server.run();
console.log("End");
