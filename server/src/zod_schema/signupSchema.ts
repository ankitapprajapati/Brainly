import {z} from 'zod';

export const siginupSchema = z.object({
    username : z.string().min(3).max(15),
    password : z.string().min(8).max(20)
})