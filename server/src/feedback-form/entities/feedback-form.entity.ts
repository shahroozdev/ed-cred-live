import { User } from "src/auth/user.entity";
import { Category } from "src/category/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FeedbackDetails, Question } from "../dto/create-feedback-form.dto";
import { Subcategory } from "src/subcategory/subcategory.entity";
import { FeedbackResponse } from "src/feedback-response/entities/feedback-response.entity";

@Entity()
export class FeedbackForm {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.feedbackForms, { onDelete: 'CASCADE' })
    author: User;

    @ManyToOne(() => Category, (category) => category.feedbackForms, { onDelete: 'CASCADE' })
    category: Category;

    @ManyToOne(() => Subcategory, (subcategory) => subcategory.feedbackForms, { onDelete: 'CASCADE' })
    subcategory: Subcategory;

    @Column({ type: "text" })
    title: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @Column({ default: true })
    isDraft: boolean;

    @Column({ type: "jsonb" })
    details: FeedbackDetails;

    @Column({ type: "jsonb" })
    questions: Question[];

    // Mapping responses to feedback form
    @OneToMany(() => FeedbackResponse, (response) => response.feedbackForm, { cascade: true })
    responses: FeedbackResponse[];
}
