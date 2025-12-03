import { Router } from "express";
import { createVehicleHandler, getClientVehiclesHandler } from "../controllers/vehicle.controller";
import validate from "../middleware/validateResource";
import { createVehicleSchema } from "../schemas/vehicle.schema";

const router = Router();

router.post("/", validate(createVehicleSchema), createVehicleHandler);

router.get("/client/:clientId", getClientVehiclesHandler);

export default router;