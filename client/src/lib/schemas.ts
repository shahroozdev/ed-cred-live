// schemas/login-schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(2, "Field is Required."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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
  // details: z.object({
  //   // common
  //   salary: z.boolean(),
  //   schoolName: z.boolean(),
  //   schoolWebsite: z.boolean(),
  //   schoolCountry: z.boolean(),
  //   reportingPeriod: z.boolean(),

  //   // for the category pricipal
  //   pricipalName: z.boolean(),
  //   pricipalDivison: z.boolean(),

  //   // for the category director
  //   directorName: z.boolean(),
  // }),
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
export const feedbackCreateResponseSchema = (feedback: any) => {
  return z.object({
    details: z.object({
      revieweeName: z.string().min(1, "Field is required."),
      schoolName: z.string().min(1, "Field is required."),
      country: z.string().min(1, "Field is required."),
      website: z.string().optional(),
      divison: z.string().min(1, "Field is required."),
      reportingPeriod: z.string().optional(),
    }),
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
    comments: z.string(),
    attachments: z.any().optional(),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms." }),
    }),
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

export const replySchema = z.object({
  text: z.string().min(5, "Minimum 5 Charters Required."),
});

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // description: z.string().min(1, "Description is required"),
  body: z.string().min(1, "Body is required"),
  image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "Image must be a valid image file",
  }),
  featured: z.boolean(),
  status: z.boolean(),
});
export const disputeSchema = z.object({
  reason: z.string().min(1, "Reason is required"),

  attachment: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file ||
        ["image", "video", "audio", "application"].some((type) =>
          file.type.startsWith(type)
        ),
      {
        message: "Attachment must be an image, video, audio, or document file",
      }
    ),

  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms." }),
  }),
});

export const disputeTimelineSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
  attachment: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file ||
        ["image", "video", "audio", "application"].some((type) =>
          file.type.startsWith(type)
        ),
      {
        message: "Attachment must be an image, video, audio, or document file",
      }
    ),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fname: z.string().optional(),
  lname: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  education: z.string().optional(),
  profession: z.string().optional(),
  bio: z.string().optional(),
});
