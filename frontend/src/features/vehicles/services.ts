import api from "../../lib/axios";
import type { Vehicle } from "./types";

export const getVehiclesByClient = async (clientId: string): Promise<Vehicle[]> => {
    const response = await api.get<Vehicle[]>(`/vehicles/client/${clientId}`);
    return response as unknown as Vehicle[];
};
