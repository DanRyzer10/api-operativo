import {email, z} from 'zod';


export const createClientSchema = z.object({
    phoneNumber: z.string().startsWith('+'),
    fullName: z.string().min(3).max(100).optional(),
    email: z.string().email({ message: "Email inválido" }).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    tags: z.string().optional(),
    notes: z.string().optional(),
    sourceId: z.string().optional(),
    statusId: z.string().optional(),
    lastContactDate: z.coerce.date().optional(),
})

export type CreateClientRequest = z.infer<typeof createClientSchema>;