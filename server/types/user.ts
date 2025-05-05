enum UserRole {
    ADMIN     = "admin",
    MODERATOR = "moderator",
    USER      = "user",
}

enum UserCategory {
    STUDENT  = "student",
    TEACHER  = "teacher",
    CUSTOMER = "customer",
    EMPLOYEE = "employee",
}

enum Permission {
    VIEW_POST   = "view_post",
    CREATE_POST = "create_post",
    CREATE_FEEDBACK_FORM = "create_feedback_form",
    ANSWER_FEEDBACK_FORM = "answer_feedback_form",
}

enum SubscriptionPlan {
    FREE       = "free",
    BASIC      = "basic",
    PREMIUM    = "premium",
    ENTERPRISE = "enterprise",
}

interface BaseUser {
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

export { BaseUser, Permission, SubscriptionPlan, UserRole, UserCategory };
