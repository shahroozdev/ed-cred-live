import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./category/category.entity"
import { Role } from "./role/entities/role.entity"
import { ForumQuestion } from "./forum-question/entities/forum-question.entity"
import { ForumReply } from "./forum-reply/entities/forum-reply.entity"
import { FeedbackForm } from "./feedback-form/entities/feedback-form.entity"
import { FeedbackResponse } from "./feedback-response/entities/feedback-response.entity"
import { Dispute } from "./dispute/dispute.entity"
import { Post } from "./posts/post.entity"
import { User } from "./auth/user.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "cmuser",
    password: "admin123",
    database: "cmsdb",
    synchronize: true,
    logging: false,
    entities: [User, Role, Category, ForumQuestion, ForumReply, FeedbackForm, FeedbackResponse, Dispute, Post],
    migrations: [],
    subscribers: [],
})
