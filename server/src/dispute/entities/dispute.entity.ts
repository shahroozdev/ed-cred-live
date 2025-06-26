import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "../../auth/user.entity";
import { FeedbackResponse } from "../../feedback-response/entities/feedback-response.entity";
import { DisputeTimeline } from "./dispute.timeline.entity";

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => FeedbackResponse, (response) => response?.disputes, {
    onDelete: "CASCADE",
  })
  feedbackResponse: FeedbackResponse;

  @ManyToOne(() => User, (user) => user.disputes, { eager: true })
  disputedBy: User;

  @OneToMany(() => DisputeTimeline, (timeline) => timeline.dispute, {
    cascade: true,
  })
  timeline: DisputeTimeline[];

  @Column("text")
  reason: string;

  @Column({ type: "text", nullable: true })
  attachment?: string;

  @Column({ default: "pending" })
  status: "pending" | "reviewed" | "resolved" | "rejected";

  @Column({ type: "text", nullable: true })
  adminNotes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
