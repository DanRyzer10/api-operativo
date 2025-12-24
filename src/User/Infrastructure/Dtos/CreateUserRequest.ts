import {z} from 'zod';


export const CreateUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3).max(100),
    phone: z.string().startsWith('+'),
    password: z.string().min(6).max(100).optional(),
    role: z.string().optional()
})


export type CreateUserRequest = z.infer<typeof CreateUserSchema>;