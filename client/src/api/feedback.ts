import { toast } from "sonner";
import { API_BASE_URL, getRequest } from "./config";

const API_URL = `${API_BASE_URL}/feedback-form`

export async function getFeedbackByCategory(categoryId: string, subcategoryId: string) {
    try {
        const response = await fetch(`${API_URL}/category/${categoryId}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching feedback form:", error);
        toast.error("Something went wrong while fetching the feedback form");
        return null;
    }
}

export async function sendFeedback(feedback: any) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback),
        });

        if (!response.ok) throw new Error('Failed to send feedback');
        const body = await response.json();
        console.log(body);
        toast(`<pre>${JSON.stringify(body, null, 2)}</pre>`);
        return body;
    } catch (error) {
        console.error("Error sending feedback:", error);
        return null;
    }
}

export async function fetchFeedbacks() {
    try {
        const response = await fetch(`${API_URL}`);

        if (!response.ok) throw new Error('Failed to fetch feedbacks');

        return await response.json();
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return [];
    }
}

export async function fetchFeedbacksByUserCategory() {
    const response = await getRequest("/feedback-form/forms");
    if (response.error) {
        console.error(response.message);
        toast.error(response.message);
        return;
    }
    return await response.json();
}

export async function fetchFeedbackById(id: string) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch feedback');

        return await response.json();
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return null;
    }
}

export async function deleteFeedback(id: string) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete feedback');

        toast.success("Feedback deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting feedback:", error);
        toast.error("Something went wrong while deleting the feedback");
        return false;
    }
}
