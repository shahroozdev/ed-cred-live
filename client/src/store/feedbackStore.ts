import { create } from "zustand";
import { toast } from "sonner";

const BASE_URL = "188.132.135.5"  
export const API_URL = `http://${BASE_URL}:6969/feedback`;

export interface Feedback {
    id: string;
    title: string;
    category: string;
    subcategory: string;
    status: "active" | "inactive";
    details: {
        name: boolean;
        country: boolean;
        dates: boolean;
        salary: boolean;
        web: boolean;
    };
}

interface FeedbackState {
    feedbacks: Feedback[];
    loading: boolean;
    error: string | null;

    fetchFeedbacks: () => Promise<void>;
    fetchFeedbackById: (id: string) => Promise<Feedback | null>;
    sendFeedback: (feedback: Omit<Feedback, "id">) => Promise<Feedback | null>;
}

export const useFeedbacksStore = create<FeedbackState>((set, get) => ({
    feedbacks: [],
    loading: false,
    error: null,

    fetchFeedbacks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch feedbacks");
            const data = await response.json();
            set({ feedbacks: data, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Error fetching feedbacks:", error);
        }
    },

    fetchFeedbackById: async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error("Failed to fetch feedback");
            return await response.json();
        } catch (error) {
            console.error("Error fetching feedback:", error);
            return null;
        }
    },

    sendFeedback: async (feedback: Omit<Feedback, "id">) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(feedback),
            });

            if (!response.ok) throw new Error("Failed to send feedback");

            const newFeedback = await response.json();
            set({ feedbacks: [...get().feedbacks, newFeedback] });

            toast.success("Feedback sent successfully!");
            return newFeedback;
        } catch (error) {
            toast.error("Error sending feedback");
            console.error("Error sending feedback:", error);
            return null;
        }
    },
}));
