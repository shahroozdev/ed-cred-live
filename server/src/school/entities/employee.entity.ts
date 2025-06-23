// employee.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Branch } from "./branch.entity";
import { FeedbackResponse } from "src/feedback-response/entities/feedback-response.entity";
import { Category } from "src/category/category.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.employees)
  @JoinColumn()
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Branch, (branch) => branch.employees)
  @JoinColumn()
  branch: Branch;

  @OneToMany(() => FeedbackResponse, (response) => response.employee)
  responses: FeedbackResponse[];
}
