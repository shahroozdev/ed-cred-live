import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Feedback {
    id: string;
    title: string;
    userCategoryId: string;
    formCategoryId: string;
    // category: number;
    // subcategory: string;
    status: "active" | "inactive";
    details: any;
}

interface FeedbackSotre {
    feedback: Feedback | null;
    setFeedback: (feedback: Feedback) => void;
    resetFeedback: () => void;
}   

export const useFeedbackStore = create<FeedbackSotre>()(
    persist(
        (set, get) => ({
            feedback: null,
            setFeedback: (feedback) => set(() => ({ feedback })),
            resetFeedback: () => set(() => ({ feedback: null })), 
        }),
        { name: "question-store" }
    )
);
