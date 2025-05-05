import { toast } from "sonner";
import { API_BASE_URL } from "./config";

export const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

export async function signup(username: string, email: string, password: string) {
    const response = await fetch(`${AUTH_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
}

export async function login(identifier: string, password: string) {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();
    console.log(data);
    if (data.error) return data;
    localStorage.setItem('token', data.token);
    return { success: true };
}

export async function getProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("can not find the token!");
        window.herf.replace('/login');
    }

    const response = await fetch(`${AUTH_BASE_URL}/profile`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    if (response.error) {
        toast(response.message);
        console.log(response.message);
    }

    return await response.json();
}

export async function setUserCategory(categoryId: number) : Promise<any> {

    const token = localStorage.getItem('token');
    if (!token) return false;

    const response = await fetch(`${AUTH_BASE_URL}/users/category`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryId }),
    });

    const data = await response.json();
    return data;
}

export function logout() {
    localStorage.removeItem('token');
}
