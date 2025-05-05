import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { BasePermissions } from '../dto/create-role.dto';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'json', nullable: true })
    permissions: {
        teacher:    BasePermissions;
        admin:      BasePermissions;
        leadership: BasePermissions;
        district:   BasePermissions;
        parent:     BasePermissions;
    };
}
