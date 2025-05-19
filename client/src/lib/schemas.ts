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

export const CategoryFiltersSchema = z.object({
  name: z.string().optional(),
  to_date: z.string().optional(),
  from_date: z.string().optional(),
});

export const GeneralFormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be under 50 characters"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  status: z.enum(["active", "inactive"]),
  details: z.object({
    // common
    salary: z.boolean(),
    schoolName: z.boolean(),
    schoolWebsite: z.boolean(),
    schoolCountry: z.boolean(),
    reportingPeriod: z.boolean(),

    // for the category pricipal
    pricipalName: z.boolean(),
    pricipalDivison: z.boolean(),

    // for the category director
    directorName: z.boolean(),
  }),
});

export const QuestionFormSchema = z.object({
  question: z.string().min(4, "The question needs to be atleast 4 characters!"),
  questionType: z.enum(
    ["rating", "multiple_choice", "true_false", "open_ended"],
    {
      required_error: "Question type is required",
    }
  ),
  questionOptions: z
    .array(
      z.object({
        value: z.string().min(2, "The option must be altest 2 characters!"),
      })
    )
    .optional(),
  questionCorrectAnswer: z.string().optional(),
});