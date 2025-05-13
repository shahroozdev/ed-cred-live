import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { FeedbackForm } from "src/feedback-form/entities/feedback-form.entity";
import { User } from "src/auth/user.entity";

@Entity()
export class FeedbackResponse {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => FeedbackForm, (feedbackForm) => feedbackForm.responses, { onDelete: "CASCADE" })
    feedbackForm: FeedbackForm;

    @ManyToOne(() => User, (user) => user.feedbackFormsResponses, { nullable: true })
    author: User;

    @Column({ default: false })
    accepted: boolean;

    @Column("jsonb")
    details: {
        salary:          string;
        schoolName:      string;
        schoolWebsite:   string;
        schoolCountry:   string;
        reportingPeriod: string;
        pricipalName:    string;
        pricipalDivison: string;
        directorName:    string;
    };

    @Column("jsonb")
    answers: {
        questionId: string;
        answer: string | string[] | boolean | number;
    }[];

    @Column({ type: "text", nullable: true })
    comments?: string;

    @CreateDateColumn()
    submittedAt: Date;
}
