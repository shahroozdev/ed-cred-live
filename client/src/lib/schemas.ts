// schemas/login-schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(2, "Field is Required."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export const forgetPasswordSchema = z.object({
    email: z.string().email("Invalid email address")
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const CategoryFiltersSchema = z.object({
  name: z.string().optional(),
  to_date: z.string().optional(),
  from_date: z.string().optional(),
});
export const FeedbackFilterSchema = z.object({
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  isDraft: z.string().optional(),
});

export const QuestionFormSchema = z.object({
  type: z.enum(["rating", "multiple_choice", "true_false", "open_ended"], {
    required_error: "Field is required.",
  }),
  text: z.string().min(1, { message: "Field is required." }),
  options: z.array(z.any()).optional(),
  answer: z.union([z.string(), z.number(), z.boolean()]).optional(),
});

export const GeneralFormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be under 50 characters"),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "Subcategory is required"),
  isDraft: z.enum(["active", "inactive"]),
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
  questions: z.array(QuestionFormSchema),
});
export const imageSchema = z
  .any()
  .refine((file) => file instanceof File, {
    message: "File is required",
  })
  .refine((file) => file?.type?.startsWith("image/"), {
    message: "Only image files are allowed",
  })
  .refine((file) => file?.size <= 2 * 1024 * 1024, {
    message: "Max file size is 2MB",
  });
export const feedbackCreateResponseSchema = (feedback: Record<string, any>) => {
  const detailsFields = Object.keys(feedback?.details).filter(
    (key) => feedback?.details[key]
  );
  return z.object({
    details: z.object(
      detailsFields?.reduce((acc: any, curr: any) => {
        acc[curr] = z.string().min(1, "Field is required.");
        return acc;
      }, {})
    ),
    answers: z
      .array(
        z.object({
          questionId: z.any(),
          answer: z.union([
            z.string().min(1, "Answer is required."),
            z.number().min(1, "Answer is required."),
            z.boolean(),
          ]),
          question: z.string(),
        })
      )
      .min(feedback.questions.length, "All questions must be answered."),
      comments:z.string(),
      attachments:z.any().optional()
  });
};


export const ForumSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  text: z.string().min(1, { message: "Text is required" }),
  featuredImage: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image file is required",
    })
    .refine((file) => file?.type?.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});