
// Optional details toggles
export interface FeedbackDetails {
        salary:          boolean;
        schoolName:      boolean;
        schoolWebsite:   boolean;
        schoolCountry:   boolean;
        reportingPeriod: boolean;
        pricipalName:    boolean;
        pricipalDivison: boolean;
        directorName:    boolean;
}

export interface Question {
    id: string;
    text: string;
    type: "rating" | "multiple_choice" | "true_false" | "open_ended";
    options?: string[];
    correctAnswer?: string;
}

export class CreateFeedbackFormDto {
    categoryId: number;
    subCategoryId: number;
    authorId: number;
    title: string;
    isDraft: boolean;
    details: FeedbackDetails;
    questions: Question[];
}
