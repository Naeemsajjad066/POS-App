import { z } from 'zod'


export const signupSchema = z.object({
    name: z.string().min(2, "Must have more than 3 chars"),
    email: z.string().email("Must be a proper Email"),
    password: z.string().min(8, "Must have atleast 8 characters")
})
export const signinSchema = z.object({
    email: z.string().email("Must be proper email"),
    password: z.string().min(8, "Password is minimum 8 characters")
})