import { z } from "zod";

export const createClientSchema = z.object({
    body: z.object({
        firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
        lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
        email: z.string().email('Correo electrónico inválido'),
        phone: z.string().min(10, 'El teléfono es muy corto'),
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

