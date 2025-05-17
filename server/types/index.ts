import { Category } from "src/category/category.entity";

export type response = {
  status: number;
  message: string;
  total?:number;
  currentPage?: number;
  pageSize?: number;
};

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
}

export enum UserCategory {
  STUDENT = "student",
  TEACHER = "teacher",
  CUSTOMER = "customer",
  EMPLOYEE = "employee",
}

export enum Permission {
  VIEW_POST = "view_post",
  CREATE_POST = "create_post",
  CREATE_FEEDBACK_FORM = "create_feedback_form",
  ANSWER_FEEDBACK_FORM = "answer_feedback_form",
}

export enum SubscriptionPlan {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
}

export interface BaseUser {
  name: string;
  email: string;
  role: UserRole;
  category: Category;
  permissions: Permission[];

  subscription: {
    status: "free" | "subscribed";
    plan?: SubscriptionPlan;
    expiresAt?: Date;
  };

  profile_picture?: string;
  isVerified?: boolean;

  preferences?: Record<string, any>;
  notificationsEnabled?: boolean;

  activityLogs?: { action: string; timestamp: Date }[];

  createdAt?: Date;
  updatedAt?: Date;
}
