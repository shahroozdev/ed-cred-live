import { ForumQuestion } from '../forum-question/entities/forum-question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import { ForumReply } from '../forum-reply/entities/forum-reply.entity';
import { FeedbackForm } from '../feedback-form/entities/feedback-form.entity';
import { UserRole, Permission, SubscriptionPlan } from "./../../types/user";
import { FeedbackResponse } from '../feedback-response/entities/feedback-response.entity';
import { Dispute } from '../dispute/dispute.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { UserPackage } from 'src/packages/entities/user.packages.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    // TODO: keep the last login time
    //@Column()
    //lastLogin: Date;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;


    @Column({ type: 'enum', enum: Permission, array: true })
    permissions: Permission[];

    @Column({ type: 'jsonb', default: { status: 'free' } })
    subscription: {
        status: 'free' | 'subscribed';
        plan?: SubscriptionPlan;
        expiresAt?: Date;
    };

    @Column({ nullable: true })
    profile_picture?: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    verificationDocumentUrl: string;

    @Column({ nullable: true })
    emailVerificationToken: string;

    @Column({ nullable: true })
    profilePictureUrl: string;

    @Column({ type: 'jsonb', nullable: true })
    preferences?: Record<string, any>;

    //NOTE: if we delete a category, what shall happen to the 
    // users of that category?
    @ManyToOne(() => Subcategory, (subcategory) => subcategory.users)
    category: Subcategory;

    @OneToMany(() => Dispute, (dispute) => dispute.disputedBy)
    disputes: Dispute[];

    @OneToMany(() => ForumQuestion, (question) => question.author)
    questions: ForumQuestion[];

    @OneToMany(() => ForumReply, (reply) => reply.author)
    replies: ForumReply[];

    @OneToMany(() => FeedbackForm, (form) => form.author)
    feedbackForms: FeedbackForm[];

    @OneToMany(() => FeedbackResponse, (form) => form.author)
    feedbackFormsResponses: FeedbackResponse[];

    @OneToMany(() => UserPackage, (UserPackage) => UserPackage.user)
    UserPackage: UserPackage[];
}
