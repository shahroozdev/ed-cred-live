import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { FeedbackForm } from "../../feedback-form/entities/feedback-form.entity";
import { User } from "../../auth/user.entity";
import { Dispute } from "../../dispute/entities/dispute.entity";
import { Employee } from "../../school/entities/employee.entity";

@Entity()
export class FeedbackResponse {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => FeedbackForm, (feedbackForm) => feedbackForm.responses, {
    onDelete: "CASCADE",
  })
  feedbackForm: FeedbackForm;

  @ManyToOne(() => User, (user) => user.feedbackFormsResponses, {
    nullable: true,
    onDelete: "CASCADE",
  })
  author: User;

  @Column({ default: false })
  accepted: boolean;

  @Column({ default: "Pending" })
  status: "Pending" | "Accepted" | "Rejected";

  @Column({ default: false })
  isVerified: boolean ;

  @Column({ nullable: true })
  verifierComment: string ;

  @Column("jsonb")
  details: {
    salary: string;
    schoolName: string;
    schoolWebsite: string;
    schoolCountry: string;
    reportingPeriod: string;
    pricipalName: string;
    pricipalDivison: string;
    directorName: string;
  };
  @ManyToOne(() => Employee)
  employee: Employee;

  @Column("jsonb")
  answers: {
    questionId: number | string;
    question: string;
    answer: string | string[] | boolean | number;
  }[];

  @Column({ type: "text", nullable: true })
  comments?: string;

  @Column({ default: false })
  agreeTerms: boolean;

  @Column({ nullable: true })
  avgRatting: number;

  @OneToMany(() => Dispute, (dispute) => dispute.feedbackResponse)
  disputes: Dispute[];

  @CreateDateColumn()
  submittedAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ type: "text", nullable: true })
  attachments?: string[];
}
