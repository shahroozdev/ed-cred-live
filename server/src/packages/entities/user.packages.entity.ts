import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Package } from './package.entity';
import { User } from '../../auth/user.entity';


@Entity()
export class UserPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Package)
  @JoinColumn()
  package: Package;

  @CreateDateColumn()
  startedAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  // JSON array of feedback IDs the user has viewed
  @Column({ type: 'jsonb', default: () => "'[]'" })
  viewedFeedbackIds: number[];

  // Counter for feedbacks submitted
  @Column({ type: 'int', default: 0 })
  givenFeedbackCount: number;
}
