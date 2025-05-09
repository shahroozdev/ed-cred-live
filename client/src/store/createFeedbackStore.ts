import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { useQuestionStore } from "./questionStore";
import { getProfile } from "@/api/auth";
import { title } from "process";

export interface Feedback {
    id: string;
    title: string;
    category: number;
    subcategory: string;
    status: "active" | "inactive";
    details: {
        name: boolean;
        country: boolean;
        dates: boolean;
        salary: boolean;
        web: boolean;
    }
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
