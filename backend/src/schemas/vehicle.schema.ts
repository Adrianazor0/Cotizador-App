import { z } from "zod";

export const createVehicleSchema = z.object({
    body: z.object({
        clientId: z.string().min(1, "The Client ID is required"),
        brand: z.string().min(2, 'the brand must be at least 2 characters'),
        vehicleModel: z.string().min(2, 'the vehicle model must be at least 2 characters'),
        year: z.number().int().min(1886, 'the year must be a valid year'),
        plate: z.string().min(1, 'the plate must be at least 1 character'),
        vin: z.string().optional(),
        color: z.string().optional(),
    })
});

/* export const updateVehicleSchema = z.object({
    body: z.object({
        brand: z.string().optional(),
        vehicleModel: z.string().optional(),
        year: z.number().int().optional(),
        plate: z.string().optional(),
        vin: z.string().optional(),
        color: z.string().optional(),
    })
}); */

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>['body'];
//export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>['body'];

