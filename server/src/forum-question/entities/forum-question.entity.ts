import { User } from "../../auth/user.entity";
import { ForumReply } from "../../forum-reply/entities/forum-reply.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ForumQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({nullable:true})
    featureImageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable:true})
    updatedAt: Date;
    // This is the relation between users and a question.
    // `onDelete: "CASCADE"` means that if a user gets deleted,
    // its corresponding questions will also be deleted.
    @ManyToOne(() => User, (user) => user.questions, { onDelete: 'CASCADE' })
    author: User;

    // A question has multiple replies
    @OneToMany(() => ForumReply, (reply) => reply.question)
    replies: ForumReply[];
}
