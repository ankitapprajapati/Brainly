import {z} from 'zod';

export const sigininSchema = z.object({
    username : z.string().min(3).max(15),
    password : z.string().min(8).max(20)
})