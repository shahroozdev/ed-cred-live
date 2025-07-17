import { DocumentTypes  } from "../../types/user";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Document {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  name: string;

  @Column()
  type: 'TOS' |'POLICY' | 'DISPUTE' | 'RESPONSE'; ;

  // ✅ Text column for long HTML content
  @Column("text")
  desc: string;
}
