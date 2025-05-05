import { API_BASE_URL, getRequest, postRequest } from "./config";

interface CreateDisputeDto {
    reason: string;
    additionalInfo?: string;
}

interface UpdateDisputeDto {
    status?: 'pending' | 'reviewed' | 'resolved' | 'rejected';
    adminNotes?: string;
}

export async function createDispute(
    feedbackResponseId: string,
    data: CreateDisputeDto,
) {
    const res = await postRequest(`disputes/${feedbackResponseId}`, JSON.stringify(data));
    if (!res.ok) throw new Error('Failed to create dispute');
    return res;
}

export async function getDispute(id: string, token: string) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch dispute');
    return await res.json();
}

export async function updateDispute(
    id: string,
    data: UpdateDisputeDto,
) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/disputes/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Failed to update dispute');
    return await res.json();
}

// 📌 Get all disputes (admin or user’s own depending on backend filtering)
export async function listDisputes() {
    const res = await getRequest(`/disputes`);
    if (!res || !res.ok) throw new Error('Failed to load disputes');
    return await res.json();
}
