import { Router } from "express";
import { typesGet } from "../controllers/typesController.js";

const typesRouter = new Router();

typesRouter.get("/", typesGet);

export { typesRouter };
