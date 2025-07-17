import { ForumQuestion } from "../forum-question/entities/forum-question.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { ForumReply } from "../forum-reply/entities/forum-reply.entity";
import { FeedbackForm } from "../feedback-form/entities/feedback-form.entity";
import { Permission, SubscriptionPlan } from "../types/user";
import { FeedbackResponse } from "../feedback-response/entities/feedback-response.entity";
import { Dispute } from "../dispute/entities/dispute.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { UserPackage } from "../packages/entities/user.packages.entity";
import { EntityLog } from "../feedback-response/entities/feedback-response-log.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @OneToMany(() => EntityLog, (log) => log.updatedBy)
  logs: EntityLog[];

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: string;

  @Column({ type: "enum", enum: Permission, array: true, default: [] })
  permissions: Permission[];

  @Column({ type: "jsonb", default: { status: "free" } })
  subscription: {
    status: "free" | "subscribed";
    plan?: SubscriptionPlan;
    expiresAt?: Date;
  };

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  state?: string;
  @Column({ nullable: true })
  fname?: string;

  @Column({ nullable: true })
  lname?: string;

  @Column({ nullable: true })
  education?: string;

  @Column({ nullable: true })
  profession?: string;
  @Column({ nullable: true })
  bio?: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verificationDocumentUrl: string;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @Column({ type: "jsonb", nullable: true })
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

  @BeforeInsert()
  @BeforeUpdate()
  trimFields() {
    if (this.username) this.username = this.username.trim();
    if (this.email) this.email = this.email.trim().toLowerCase(); // lowercase is optional but common
  }
}
