import { z } from "zod";

export const createClientSchema = z.object({
    body: z.object({
        firstName: z.string().min(2, 'Name must be at least 2 characters long'),
        lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(10, 'Phone number is too short'),
        address: z.string().optional(),
        taxId: z.string().optional(),
    })
});

export const updateClientSchema = z.object({
    body: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        taxId: z.string().optional(),
    })
});

export type CreateClientInput = z.infer<typeof createClientSchema>['body'];
export type UpdateClientInput = z.infer<typeof updateClientSchema>['body'];

