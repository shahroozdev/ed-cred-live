import { User } from "../../auth/user.entity";
import { Category } from "../../category/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FeedbackDetails } from "../dto/create-feedback-form.dto";
import { FeedbackResponse } from "../../feedback-response/entities/feedback-response.entity";
import { Subcategory } from "../../subcategory/subcategory.entity";
import { Question } from "../../question/entities/question.entity";

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
    
    @Column({ default: false })
    isDraft: boolean;

    @Column({ type: "jsonb" , nullable:true})
    details: FeedbackDetails;

    @OneToMany(() => Question, (question) => question.feedbackForm, { cascade: true })
    questions: Question[];

    // Mapping responses to feedback form
    @OneToMany(() => FeedbackResponse, (response) => response.feedbackForm, { cascade: true })
    responses: FeedbackResponse[];
}
