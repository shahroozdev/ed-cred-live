export enum UserRole {
    ADMIN     = "admin",
    SUPER_ADMIN     = "super_admin",
    USER      = "user",
}

export enum UserCategory {
    STUDENT  = "student",
    TEACHER  = "teacher",
    CUSTOMER = "customer",
    EMPLOYEE = "employee",
}

export enum Permission {
    VIEW_POST   = "view_post",
    CREATE_POST = "create_post",
    CREATE_FEEDBACK_FORM = "create_feedback_form",
    ANSWER_FEEDBACK_FORM = "answer_feedback_form",
}

export enum SubscriptionPlan {
    FREE       = "free",
    BASIC      = "basic",
    PRO    = "pro",
    ENTERPRISE = "enterprise",
}

export enum DocumentTypes  {
  POLICY = "POLICY",
  TOS = "TOS",
  DISPUTE = "DISPUTE",
  RESPONSE = "RESPONSE",
}

export interface BaseUser {
    name: string;
    email: string;
    role: UserRole;
    category: UserCategory;
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
// For comparison logic
export  const RolePriority: Record<UserRole, number> = {
  [UserRole.USER]: 1,
  [UserRole.ADMIN]: 2,
  [UserRole.SUPER_ADMIN]: 3,
};
