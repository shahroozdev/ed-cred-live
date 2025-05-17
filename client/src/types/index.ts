import { CSSProperties, ReactElement, ReactNode } from "react";
import { Category } from "./user";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";

export interface QueryProps {
  url: string;
  key: string;
}

export const imagesUrls = {
  "Leadership Members": "leadership",
  Teachers: "Teachers",
  Schools: "schools",
  Districts: "districts",
  "Staff Members": "staff",
  Parent: "parent",
  Principal: "pricipal",
} as any;

export interface CustomTableProps {
  data: any;
  columns: any;
  pagination?: boolean;
  title?: string;
  loading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
}

enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
}

enum UserCategory {
  STUDENT = "student",
  TEACHER = "teacher",
  CUSTOMER = "customer",
  EMPLOYEE = "employee",
}

enum Permission {
  VIEW_POST = "view_post",
  CREATE_POST = "create_post",
  CREATE_FEEDBACK_FORM = "create_feedback_form",
  ANSWER_FEEDBACK_FORM = "answer_feedback_form",
}

enum SubscriptionPlan {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
}

interface BaseUser {
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

  // authProvider?: "local" | "google" | "facebook";
  // lastLoginAt?: Date;
  // failedLoginAttempts?: number;
  // passwordResetToken?: string;
  // passwordResetExpiresAt?: Date;

  preferences?: Record<string, any>;
  notificationsEnabled?: boolean;

  activityLogs?: { action: string; timestamp: Date }[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModalProps {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  description?: string;
  footer?: ReactNode;
  trigger: ReactNode;
  defaultOpen?: boolean;
  notClose?: boolean;
  open: boolean;
  triggerClassName?: string;
  setIsOpen: (value: boolean) => void;
}

export interface TableWithColumnProps {
  onSubmit?: (value: any) => void;
  title: string;
  actionBtnText?: string;
  actionBtnIcon?: string;
  actionBtn?: ReactNode;
  form?: any;
  searchBar?: boolean;
  tableData: any;
  tableColumn: any;
  tablePagination?: boolean;
  noFilter?: boolean;
  removeMainCSS?: boolean;
  actionBtnWrapper?: ReactElement;
  className?: string;
  loading?: boolean; // ← Add this line
  PreNode?: ReactNode;
  total?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface CustomFormProps {
  schema: z.ZodType<any>;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  style?: any;
  arr?: Array<any>;
  preNode?: ReactNode;
  postNode?: ReactNode;
  btnCss?: string;
  btnText?: string;
  btnWidth?: string;
  style2?: CSSProperties;
  extraBtn?: ReactNode;
  btnIcon?: ReactNode;
  btnDivClassName?: string;
}
export type item = {
  id?: any;
  type: string; // Specify allowed types
  inputName: string; // Name of the input field
  placeHolder?: string; // Placeholder text
  postNode?: ReactNode;
  preNode?: ReactNode;
  style?: string;
  pStyle?: string;
  label?: ReactNode;
  options?: { value: string; label: string }[];
  optionsStyle?: string;
  optionsDivStyle?: string;
  noBorder?: boolean;
  defaultValue?: any;
  isMulti?: boolean;
  allowClear?: boolean;
  bgColor?: string;
  hAuto?: boolean;
  rows?: number;
  selectWidth?: string;
  inputWidth?: string;
  mode?: "tags" | "multiple" | "default";
  disabled?: boolean;
  copyable?: boolean;
};
