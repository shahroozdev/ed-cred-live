// import { User } from "../auth/user.entity";
import { Employee } from "../school/entities/employee.entity";
import { FeedbackForm } from "../feedback-form/entities/feedback-form.entity";
// import { Subcategory } from "src/subcategory/subcategory.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";

export type Permission = "post" | "feedback" | "review";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: "enum", enum: ["active", "draft"], default: "active" })
  status: "active" | "draft";

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // <- Soft delete column

  @Column("simple-array", { nullable: true })
  permissions?: Permission[];

  @Column("boolean")
  requiresVerification: boolean;

  @Column({ default: "categoryIcons/default.png" })
  iconUrl: string;

  // // There are multiple users in a category
  // @OneToMany(() => User, (user) => user.category)
  // users: User[];

  // A category can be linked with multiple feedback forms
  @OneToMany(() => FeedbackForm, (feedbackForm) => feedbackForm.category)
  feedbackForms: FeedbackForm[];

  @OneToMany(() => Employee, (employee) => employee.category, {onDelete: "CASCADE"})
  @JoinColumn()
  employees: Employee[];

  // @OneToMany(() => Subcategory, (subcategory) => subcategory.parentCategory)
  // subCategories: Subcategory[];
}
