// schemas/login-schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;
