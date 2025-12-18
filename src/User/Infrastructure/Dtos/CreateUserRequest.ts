import {z} from 'zod';


export const CreateUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3).max(100),
    phone: z.string().startsWith('+')
})


export type CreateUserRequest = z.infer<typeof CreateUserSchema>;