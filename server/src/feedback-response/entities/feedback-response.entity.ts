import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { FeedbackForm } from "../../feedback-form/entities/feedback-form.entity";
import { User } from "../../auth/user.entity";
import { Dispute } from "../../dispute/dispute.entity";

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
  })
  author: User;

  @Column({ default: false })
  accepted: boolean;

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

  @Column("jsonb")
  answers: {
    questionId: number| string;
    question: string;
    answer: string | string[] | boolean | number;
  }[];

  @Column({ type: "text", nullable: true })
  comments?: string;

  @OneToMany(() => Dispute, (dispute) => dispute.disputedBy)
  disputes: Dispute[];

  @CreateDateColumn()
  submittedAt: Date;

  @Column({type:"text", nullable:true})
  attachments?:string[];
}
