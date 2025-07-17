import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
import { User } from '../../auth/user.entity';
  
  @Entity()
  export class EntityLog  {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    entityName: string; // e.g., 'FeedbackResponse', 'Post'
  
    @Column()
    entityId: string; // the ID of the specific record (UUID, number, etc.)
  
    @Column("jsonb")
    snapshot: any; // snapshot of the entity at the time of update
  
    @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
    updatedBy?: User;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  