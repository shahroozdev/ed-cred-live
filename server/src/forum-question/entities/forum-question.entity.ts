import { User } from "src/auth/user.entity";
import { ForumReply } from "src/forum-reply/entities/forum-reply.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ForumQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    // This is the relation between users and a question.
    // `onDelete: "CASCADE"` means that if a user gets deleted,
    // its corresponding questions will also be deleted.
    @ManyToOne(() => User, (user) => user.questions, { onDelete: 'CASCADE' })
    author: User;

    // A question has multiple replies
    @OneToMany(() => ForumReply, (reply) => reply.question)
    replies: ForumReply[];
}
