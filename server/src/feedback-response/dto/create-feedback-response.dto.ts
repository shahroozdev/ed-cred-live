export class CreateFeedbackResponseDto {
    id: string;
    feedbackFormId: string;
    details: {
        name?: string;
        country?: string;
        dates?: string;
        salary?: string;
        web?: string;
    };
    answers: {
        questionId: string;
        answer: string | string[] | boolean | number;
    }[];
    comments?: string;
    submittedAt: string;
    authorId: number;
}
