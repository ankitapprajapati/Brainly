import {z} from 'zod';

export const siginupSchema = z.object({
    firstname : z.string().min(2).max(15),
    lastname : z.string().min(2).max(15).optional(),
    username : z.string().min(3).max(15),
    password : z.string().min(8).max(20)
})