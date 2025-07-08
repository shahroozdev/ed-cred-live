import { API_BASE_URL, postRequest } from "./config";

const API_URL  = `${API_BASE_URL}/category`

function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

export async function createCategory(
    name: string,
    status: "active" | "draft",
    permissions?: string[],
): Promise<any> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name, status, permissions }),
    });

    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
}

export async function getAllCategories(): Promise<any> {
    const response = await fetch(API_URL, { headers: getAuthHeaders() });

    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
}

export async function getCategoryById(id: number): Promise<any> {
    const response = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });

    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
}

export async function removeCategory(id: number): Promise<any> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Failed to delete category');
    return response.json();
}
