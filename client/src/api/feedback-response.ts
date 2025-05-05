import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/feedback-responses`;

export interface CreateFeedbackResponseDto {
    feedbackFormId: any;
    details: any;
    accepted: boolean;
    answers: {
        questionId: string;
        answer: string | string[] | boolean | number;
    }[];
    comments?: string;
    submittedAt: string;
}

export interface FeedbackResponse extends CreateFeedbackResponseDto {
    id: string;
}

/**
 * Create a new feedback response
 */
export const createFeedbackResponse = async (feedbackResponse: CreateFeedbackResponseDto): Promise<FeedbackResponse> => {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackResponse),
    });

    if (!response.ok) {
        throw new Error("Failed to create feedback response");
    }

    return response.json();
};

/**
 * Fetch all feedback responses
 */
export const fetchAllFeedbackResponses = async (): Promise<FeedbackResponse[]> => {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
        throw new Error("Failed to fetch feedback responses");
    }

    return response.json();
};

/**
 * Fetch a specific feedback response by ID
 */
export const fetchFeedbackResponseById = async (id: string): Promise<FeedbackResponse> => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch feedback response with ID: ${id}`);
    }

    return response.json();
};

/**
 * Update a feedback response
 */
export const updateFeedbackResponse = async (id: string, updatedData: Partial<CreateFeedbackResponseDto>): Promise<FeedbackResponse> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error(`Failed to update feedback response with ID: ${id}`);
    }

    return response.json();
};

/**
 * Delete a feedback response
 */
export const deleteFeedbackResponse = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete feedback response with ID: ${id}`);
    }
};
