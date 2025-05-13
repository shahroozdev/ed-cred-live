import { Category } from 'src/category/category.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Subcategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'enum', enum: ["active", "draft"], default: "active" })
    status: "active" | "draft";

    @CreateDateColumn()
    createdAt: Date;

    // A category can be linked with multiple feedback forms
    @OneToMany(() => FeedbackForm, (feedbackForm) => feedbackForm.category)
    feedbackForms: FeedbackForm[];

    @ManyToOne(() => Category, (category) => category.subCategories, { onDelete: 'CASCADE' })
    parentCategory: Category;
}
