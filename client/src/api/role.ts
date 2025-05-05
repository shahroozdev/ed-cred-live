import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/role`;

export interface BasePermissions {
    create: boolean;
    delete: boolean;
    update: boolean;
    view: boolean;
}

export interface Permissions {
    teacher: BasePermissions;
    admin: BasePermissions;
    leadership: BasePermissions;
    district: BasePermissions;
    parent: BasePermissions;
}

export interface Role {
    id: number;
    name: string;
    permissions: Permissions;
    createdAt: string;
}

export interface CreateRoleDto {
    name: string;
    permissions: Permissions;
}

// Create a new role
export const createRole = async (role: CreateRoleDto): Promise<Role> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role),
    });

    if (!response.ok) {
        throw new Error("Failed to create role");
    }

    return response.json();
};

// Fetch all roles
export const getAllRoles = async (): Promise<Role[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch roles");
    }
    return response.json();
};

// Fetch a single role by ID
export const getRoleById = async (id: number): Promise<Role> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch role with ID ${id}`);
    }
    return response.json();
};

// Update a role
export const updateRole = async (id: number, updatedRole: Permissions): Promise<Role> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRole),
    });

    if (!response.ok) {
        throw new Error(`Failed to update role with ID ${id}`);
    }

    return response.json();
};

// Delete a role
export const deleteRole = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete role with ID ${id}`);
    }
};
