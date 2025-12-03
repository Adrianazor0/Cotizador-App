import { Request, Response} from "express";
import * as vehicleService from '../services/vehicle.service';
import { CreateVehicleInput } from "../schemas/vehicle.schema";

export const createVehicleHandler = async (
    req: Request<{}, {}, CreateVehicleInput>, 
    res: Response
) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'The plate number is already registered.' });
        } 
        return res.status(500).json({ message: error.message });  
    }
};

export const getClientVehiclesHandler = async (
    req: Request, res: Response) => {
    try {
        const { clientId } = req.params;
        const vehicles = await vehicleService.getVehiclesByClient(clientId);
        return res.status(200).json(vehicles);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }   
};

/*export const getVehicleHandler = async (
    req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const vehicle = await vehicleService.getVehicleById(id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        return res.status(200).json(vehicle);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};*/