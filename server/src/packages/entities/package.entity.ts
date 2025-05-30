import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'int', default: 0 })
  viewFeedbackLimit: number;

  @Column({ type: 'int', default: 0 })
  giveFeedbackLimit: number;

  @Column({ type: 'int', nullable: true })
  price: number; // Optional, if monetized

  @Column({ type: 'int', default: 30 })
  durationDays: number; // Package duration in days
}

