import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({
    type: 'enum',
    enum: ['rating', 'multiple_choice', 'true_false', 'open_ended'],
  })
  type: 'rating' | 'multiple_choice' | 'true_false' | 'open_ended';

  @Column({ type: 'text', array: true, nullable: true })
  options?: string[];

  @Column({ type: 'text', nullable: true })
  answer?: string;

@ManyToOne(() => FeedbackForm, (feedbackForm) => feedbackForm.questions, { onDelete: 'CASCADE' })
feedbackForm: FeedbackForm;
}