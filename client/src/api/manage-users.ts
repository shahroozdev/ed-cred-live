import { Category } from "@/types/user";
import { getRequest, postRequest } from "./config";

export interface User {
    id:          string;
    username:    string;
    isVerified:  boolean;
    isVerifying: boolean,
    email:       string;
    category:    Category;
    role:        string;
    createdAt:   Date;
    verificationDocumentUrl: string;
}

export function formatDate(date: Date): string {
    const formatDate = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
    return formatDate;
}

export async function getUsers(): Promise<User[]> {
    const response = await getRequest("/auth/users");
    if (!response) return [];
    const body = await response.json();
    if (body.error) {
        console.error(error);
        return [];
    }
    return body;
}

export async function deleteUser(userId: string): void {
    const resopnse = await postRequest("/auth/");
}

export async function verifyUser(userId: string, action: "approve" | "reject"): Promise<void> {
    const _resopnse = await postRequest("auth/verify-user", JSON.stringify({ userId, action }));
}

export async function changeUserRole(userId: string, userRole: string): Promise<void> {
    const _resopnse = await postRequest("auth/users/role", JSON.stringify({userId, userRole}));
}

export async function changeUserCategory(userId: string, categoryId: string): Promise<void> {
    const _resopnse = await postRequest("auth/users/category/update", JSON.stringify({userId, categoryId}));
}
