import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class DocumentLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  documentId: string; // FK reference to Document

  @Column()
  name: string;

  @Column()
  type: string; // or `documentTypes` if you want enum control

  @Column("text")
  desc: string;

  @CreateDateColumn()
  createdAt: Date; // When this log entry was created
}
