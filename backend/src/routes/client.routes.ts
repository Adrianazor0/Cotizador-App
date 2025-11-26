import { Router } from "express";
import { createClientHandler, getClientHandler, getClientsHandler } from "../controllers/client.controller";
import validate from "../middleware/validateResource";
import { createClientSchema } from "../schemas/client.schema";

const router = Router();

router.post("/", validate(createClientSchema), createClientHandler);
router.get("/", getClientsHandler);
router.get("/:id", getClientHandler);

export default router;