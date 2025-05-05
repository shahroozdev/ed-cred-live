import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { ForumQuestion } from "src/forum-question/entities/forum-question.entity";

@Entity()
export class ForumReply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    // A user may have multiple replies to a question
    @ManyToOne(() => User, (user) => user.replies, { onDelete: 'CASCADE' })
    author: User;

    @ManyToOne(() => ForumQuestion, (question) => question.replies, { onDelete: "CASCADE"})
    question: ForumQuestion;
}

