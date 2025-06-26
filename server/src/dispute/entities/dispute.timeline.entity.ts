import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Dispute } from "./dispute.entity";

@Entity()
export class DisputeTimeline {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "text", nullable: true })
    message?: string;
  
    @Column({ type: "text", nullable: true })
    attachment?: string;
  
    @Column({ type: "enum", enum: ["admin", "user"] })
    sender: "admin" | "user";
  
    @ManyToOne(() => Dispute, (dispute) => dispute.timeline, { onDelete: "CASCADE" })
    dispute: Dispute;
}