import { z } from "zod";

export const usernameValidation = z
.string()
.min(2,"Username must be at least 2 char")
.max(20,"Username must not be more that 20 char")
.regex(/^[a-zA-Z0-9_]+$/,"Username must not contains special char")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid Email Address"}),
    password: z.string().min(6,{message:"At lease 6 char"})
})