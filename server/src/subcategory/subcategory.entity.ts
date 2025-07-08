import { User } from "../auth/user.entity";
import { FeedbackForm } from "../feedback-form/entities/feedback-form.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: "enum", enum: ["active", "draft"], default: "active" })
  status: "active" | "draft";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true})
  updatedAt: Date;


  @Column({ default: "categoryIcons/default.png" })
  iconUrl: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // <- Soft delete column
  // There are multiple users in a category
  @OneToMany(() => User, (user) => user.category)
  users: User[];
  // A category can be linked with multiple feedback forms
  @OneToMany(() => FeedbackForm, (feedbackForm) => feedbackForm.subcategory)
  feedbackForms: FeedbackForm[];

  // @ManyToOne(() => Category, (category) => category.subCategories, {
  //   onDelete: "CASCADE",
  // })
  // parentCategory: Category;
}
