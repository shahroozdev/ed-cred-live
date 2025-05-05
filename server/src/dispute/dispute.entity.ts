import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';

@Entity()
export class Dispute {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => FeedbackResponse, (response) => response.disputes, { onDelete: 'CASCADE' })
    feedbackResponse: FeedbackResponse;

    @ManyToOne(() => User, (user) => user.disputes, { eager: true })
    disputedBy: User;

    @Column('text')
    reason: string;

    @Column({ type: 'text', nullable: true })
    additionalInfo?: string;

    @Column({ default: 'pending' })
    status: 'pending' | 'reviewed' | 'resolved' | 'rejected';

    @Column({ type: 'text', nullable: true })
    adminNotes?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
