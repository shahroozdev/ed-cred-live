import { User } from "src/auth/user.entity";

export class CreateForumQuestionDto {
    title: string;
    text: string;
    // The UUID of the user. Must be sent.
    authorId: number;
}
