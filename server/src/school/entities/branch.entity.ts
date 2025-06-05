import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "./school.entity";
import { Employee } from "./employee.entity";

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  division: string;

  @Column({ nullable: true })
  website: string;

  @ManyToOne(() => School, (school) => school.branches)
  @JoinColumn()
  school: School;

  @OneToMany(() => Employee, (employee) => employee.branch)
  employees: Employee[];
}
