export interface Vehicle {
    _id: string;
    client: string;
    brand: string;
    vehicleModel: string;
    year: number;
    plate: string;
    color?: string;
    vin?: string;
}
