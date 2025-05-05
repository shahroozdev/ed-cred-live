import { toast } from "sonner";

export const API_BASE_URL = "http://localhost:6969";
//export const API_BASE_URL = "http://188.132.135.5:6969";

//WARN: deprecated. Use the getRequest instead
export const request = async (route: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Can not find the token, please log in again!");
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/${route}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    return await response.json();
}

export const getRequest = async (route: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Can not find the token, please log in again!");
        return null;
    }

    const response = await fetch(`${API_BASE_URL}${route}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    return response;
}


export const postRequest = async (route: string, body: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Can not find the token, please log in again!");
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/${route}`, {
        method: 'POST',
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: body,
    });

    return await response.json();
}

export const postFormDataRequest = async (route: string, body: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Can not find the token, please log in again!");
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/${route}`, {
        method: 'POST',
        headers: { 
            "Authorization": `Bearer ${token}`,
        },
        body: body,
    });

    return await response.json();
}
