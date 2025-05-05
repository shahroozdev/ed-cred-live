import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuestionType = "rating" | "multiple_choice" | "true_false" | "open_ended";

export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: any[];
    answer?: string | number | boolean;
}

interface QuestionStore {
    questions: Question[];
    addQuestion: (question: Question) => void;
    removeQuestion: (id: string) => void;
}

export const useQuestionStore = create<QuestionStore>()(
    persist(
        (set, get) => ({
            questions: [],
            addQuestion: (question) =>
                set((state) => ({ questions: [...state.questions, question] })),
            removeQuestion: (id) =>
                set((state) => ({
                    questions: state.questions.filter((q) => q.id !== id),
                })),
        }),
        { name: "question-store" }
    )
);
