// src/seeders/seeder.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "../auth/user.entity";
import { Category } from "../category/category.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { Post } from "../posts/entities/post.entity";
import { FeedbackForm } from "../feedback-form/entities/feedback-form.entity";
import { FeedbackResponse } from "../feedback-response/entities/feedback-response.entity";
import { Dispute } from "../dispute/entities/dispute.entity";
import { Package } from "../packages/entities/package.entity";
import { UserPackage } from "../packages/entities/user.packages.entity";
import { School } from "../school/entities/school.entity";
import { Employee } from "../school/entities/employee.entity";
import { Branch } from "../school/entities/branch.entity";
import { DisputeTimeline } from "../dispute/entities/dispute.timeline.entity";
import { EntityLog } from "../feedback-response/entities/feedback-response-log.entity";
import { Document } from "../documents/entities/document.entity";
import { DocumentLog } from "../documents/entities/document-log.entity";
import { categories, feedbackForms, packages, subcategories } from "./data";
import { Question } from "../question/entities/question.entity";

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(FeedbackForm)
    private feedbackFormRepository: Repository<FeedbackForm>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(FeedbackResponse)
    private feedbackResponseRepository: Repository<FeedbackResponse>,
    @InjectRepository(Dispute) private disputeRepository: Repository<Dispute>,
    @InjectRepository(Package) private packageRepository: Repository<Package>,
    @InjectRepository(UserPackage)
    private userPackageRepository: Repository<UserPackage>,
    @InjectRepository(School) private schoolRepository: Repository<School>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
    @InjectRepository(DisputeTimeline)
    private disputeTimelineRepository: Repository<DisputeTimeline>,
    @InjectRepository(EntityLog)
    private entityLogRepository: Repository<EntityLog>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(DocumentLog)
    private documentLogRepository: Repository<DocumentLog>
  ) {}

  async seed() {
    try {
      this.logger.log("Starting database seeding...");

      // Prevent seeding in production
      if (process.env.NODE_ENV === "production") {
        throw new Error("Seeding is disabled in production!");
      }
      // Seed Subcategories
      for (const subcategory of subcategories) {
        const existingSubcategory = await this.subcategoryRepository.findOne({
          where: { name: subcategory.name },
        });
        if (!existingSubcategory) {
          await this.subcategoryRepository.save(subcategory);
          this.logger.log(`Seeded subcategory: ${subcategory.name}`);
        }
      }
      // Seed Users
      const subCategories = await this.subcategoryRepository.find();
      const hashedPassword = await bcrypt.hash("MNBmnb@123", 10);

      const users = [
        {
          username: "admin",
          email: `admin@ed-cred.com`,
          password: hashedPassword,
          role: "admin",
          isVerified: true,
        },
        {
          username: "superAdmin",
          email: `superAdmin@ed-cred.com`,
          password: hashedPassword,
          role: "super_admin",
          isVerified: true,
        },
        ...subCategories?.map((subcategory, i) => ({
          username: subcategory?.name?.trim(),
          email: `${subcategory?.name?.trim()}@ed-cred.com`,
          password: hashedPassword,
          role: "user",
          isVerified: true,
          category: subcategory,
        })),
      ];
      for (const user of users) {
        const existingUser = await this.userRepository.findOne({
          where: { email: user.email },
        });
        if (!existingUser) {
          await this.userRepository.save(user);
          this.logger.log(`Seeded user: ${user.email}`);
        }
      }

      // Seed Categories
      for (const category of categories) {
        const existingCategory = await this.categoryRepository.findOne({
          where: { name: category.name },
        });
        if (!existingCategory) {
          await this.categoryRepository.save(category);
          this.logger.log(`Seeded category: ${category.name}`);
        }
      }

      // Seed Packages
      for (const pkg of packages) {
        const existingPackage = await this.packageRepository.findOne({
          where: { title: pkg.title },
        });
        if (!existingPackage) {
          await this.packageRepository.save(pkg);
          this.logger.log(`Seeded package: ${pkg.title}`);
        }
      }

      // Seed Feddback Form
      for (const form of feedbackForms) {
        const existingForm = await this.feedbackFormRepository.findOne({
          where: {
            title: form.title,
            category: { name: form.category },
            subcategory: { name: form.subcategory },
          },
          relations: ["category", "subcategory"],
        });
        if (!existingForm) {
          const category = await this.categoryRepository.findOne({
            where: { name: form.category },
          });

          const subcategory = await this.subcategoryRepository.findOne({
            where: { name: form.subcategory },
          });

          const feedbackForm = this.feedbackFormRepository.create({
            title: form.title,
            category,
            subcategory,
            questions: [], // We'll add them after saving the form
          });

          // Save the form first to get an ID for relation
          const savedForm =
            await this.feedbackFormRepository.save(feedbackForm);
          // Now add questions and link them to the saved form
          const questions: Question[] = [];
          for (const questionData of form.questions) {
            const question = this.questionRepository.create({
              ...questionData,
              type:questionData.type as "open_ended" | "rating" | "multiple_choice" | "true_false",
              feedbackForm: savedForm,
            });
            questions.push(await this.questionRepository.save(question));
          }

          savedForm.questions = questions;

          // Optionally update the form with questions (if not eager)
          await this.feedbackFormRepository.save(savedForm);
          this.logger.log(`Seeded feedback forms: ${form.title}`);
        }
      }

      this.logger.log("Database seeding completed.");
    } catch (error) {
      this.logger.error(`Seeding failed: ${error.message}`);
      throw error;
    }
  }
}
