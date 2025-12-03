import Vehicle, { IVehicle } from '../models/Vehicle';
import { CreateVehicleInput } from '../schemas/vehicle.schema';

export const createVehicle = async (input: CreateVehicleInput): Promise<IVehicle> => {
    return await Vehicle.create({
        ...input,
        client: input.clientId
    });
}

export const getVehiclesByClient = async (clientId: string): Promise<IVehicle[]> => {
    return await Vehicle.find({ client: clientId });
}

/*export const getVehicles = async (): Promise<IVehicle[]> => {
    return await Vehicle.find({ active: true });
}*/  

/*export const updateVehicle = async (id: string, input: UpdateVehicleInput): Promise<IVehicle | null> => {
    return await Vehicle.findByIdAndUpdate(id, input, { new: true });
}*/  

/*export const softDeleteVehicle = async (id: string): Promise<IVehicle | null> => {
    return await Vehicle.findByIdAndUpdate(id, { active: false }, { new: true });
}*/   


