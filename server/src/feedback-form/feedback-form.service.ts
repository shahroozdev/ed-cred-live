import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { CreateFeedbackFormDto } from "./dto/create-feedback-form.dto";
import { FeedbackForm } from "./entities/feedback-form.entity";
import { User } from "../auth/user.entity";
import { Category } from "../category/category.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { FeedbackResponse } from "../feedback-response/entities/feedback-response.entity";
import { response } from "types";
import { Question } from "../question/entities/question.entity";

@Injectable()
export class FeedbackFormService {
  constructor(
    @InjectRepository(FeedbackForm)
    private readonly feedbackFormRepository: Repository<FeedbackForm>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>
  ) {}

  async create(
    createFeedbackFormDto: CreateFeedbackFormDto,
    authorId: number
  ): Promise<response & { feedback?: FeedbackForm }> {
    const { categoryId, subCategoryId, questions, ...rest } =
      createFeedbackFormDto;

    const user = await this.userRepository.findOne({ where: { id: authorId } });
    if (!user)
      throw new NotFoundException(`User with ID ${authorId} not found`);

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${categoryId} not found`);

    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: subCategoryId },
    });
    if (!subcategory)
      throw new NotFoundException(
        `SubCategory with ID ${subCategoryId} not found`
      );

    // Create the feedback form first (without questions)
    const feedbackForm = this.feedbackFormRepository.create({
      ...rest,
      category,
      subcategory,
      author: user,
    });
    const savedForm = await this.feedbackFormRepository.save(feedbackForm);

    // Map and save each question individually
    const questionEntities = questions.map((q) => {
      return this.questionRepository.create({
        ...q,
        feedbackForm: savedForm, // set relation
      });
    });
    await this.questionRepository.save(questionEntities); // bulk insert

    // Reload feedbackForm with questions
    const fullFeedback = await this.feedbackFormRepository.findOne({
      where: { id: savedForm.id },
      relations: ["questions"], // include related questions
    });

    return {
      status: 200,
      message: "Feedback Form Created Successfully.",
      feedback: fullFeedback!,
    };
  }

  async getGroupedResponsesBySchool(query?: Record<string, any>) {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;

    const where: any = {};
    if (query?.name) {
      where.feedbackForm.title = ILike(`%${query?.name}%`);
    }
    const [forms, total] = await this.feedbackFormRepository.findAndCount({
      relations: [
        "questions",
        "category",
        "subcategory",
        "responses",
        "responses.author",
        "responses.employee",
        "responses.employee.branch",
        "responses.feedbackForm",
        "responses.feedbackForm.category",
      ],
    });

    const allResponses = forms.flatMap((form) =>
      form.responses.filter((response) => response.accepted)
  );
  // console.log(allResponses)

    const schoolGroups: Record<string, FeedbackResponse[]> = {};
    const principalGroups: Record<string, FeedbackResponse[]> = {};

    for (const response of allResponses) {
      const details = response.details;

      const schoolName = details?.schoolName?.trim();
      const schoolWebsite = details?.schoolWebsite?.trim();
      const schoolCountry = details?.schoolCountry?.trim();
      const pricipalName = details?.pricipalName?.trim();

      const hasValidSchool =
        schoolName && schoolWebsite && schoolCountry && !pricipalName;

      // Build school group key
      const schoolKey = hasValidSchool
        ? [schoolName, schoolWebsite, schoolCountry].join("|")
        : null;

      // Build principal group key
      const principalKey =
        pricipalName && schoolName
          ? [pricipalName, schoolName].join("|")
          : null;

      // Group by school
      if (schoolKey) {
        if (!schoolGroups[schoolKey]) {
          schoolGroups[schoolKey] = [];
        }
        schoolGroups[schoolKey].push(response);
      }

      // Group by principal only if valid
      if (principalKey) {
        if (!principalGroups[principalKey]) {
          principalGroups[principalKey] = [];
        }
        principalGroups[principalKey].push(response);
      }
    }

    const schoolGroupResults = Object.entries(schoolGroups).map(
      ([key, responses]) => {
        const [schoolName, schoolWebsite, schoolCountry] = key.split("|");
        responses.sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime()
        );
        return {
          groupType: "school",
          schoolName,
          schoolWebsite,
          schoolCountry,
          details: responses[0].details,
          responses,
        };
      }
    );

    const principalGroupResults = Object.entries(principalGroups).map(
      ([key, responses]) => {
        const [pricipalName, schoolName] = key.split("|");
        responses.sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime()
        );
        return {
          groupType: "principal",
          pricipalName,
          schoolName,
          details: responses[0].details,
          responses,
        };
      }
    );

    const combinedResults = [
      ...schoolGroupResults,
      ...principalGroupResults,
    ].sort((a, b) => {
      const latestA = a.responses[0]?.submittedAt;
      const latestB = b.responses[0]?.submittedAt;
      return new Date(latestB).getTime() - new Date(latestA).getTime();
    });

    return {
      status: 200,
      message: "All Categories List.",
      result: combinedResults,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }

  async findAll(
    query?: Record<string, any>
  ): Promise<response & { feedbacks?: FeedbackForm[] , activeCount?:number}> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;

    const where: any = {};

    // Filter by name (case-insensitive)
    if (query.name) {
      where.name = ILike(`%${query.query}%`);
    }
    // Filter by isDraft
    if (query.isDraft !== undefined) {
      where.isDraft = query.isDraft === "true" || query.isDraft === true;
    }

    // Filter by categoryId
    if (query.categoryId) {
      where.category = { id: Number(query.categoryId) };
    }

    // Filter by subCategoryId
    if (query.subCategoryId) {
      where.subcategory = { id: Number(query.subCategoryId) };
    }
    const [, activeCount] = await this.feedbackFormRepository.findAndCount({
      where: { isDraft: false },
    });
    const [feedbacks, total] = await this.feedbackFormRepository.findAndCount({
      where,
      relations: [
        "questions",
        "category",
        "subcategory",
        "responses",
        "responses.author",
        "responses.feedbackForm.category",
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: "DESC",
      },
    });
    return {
      status: 200,
      message: "All Feedbacks List.",
      feedbacks,
      total,
      activeCount,
      currentPage: Number(page),
      pageSize,
    };
  }
  async findAllBySubcategory(
    id: number,
    query?: Record<string, any>
  ): Promise<response & { feedbacks?: FeedbackForm[] }> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;
    // Fetch user and category
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    const where: any = {};
    where.subcategory = { id: user.category.id };
    where.isDraft = false;
    // Filter by name (case-insensitive)
    if (query.name) {
      where.name = ILike(`%${query.query}%`);
    }
    // Filter by isDraft
    if (query.isDraft !== undefined) {
      where.isDraft = query.isDraft === "true" || query.isDraft === true;
    }

    // Filter by categoryId
    if (query.categoryId) {
      where.category = { id: Number(query.categoryId) };
    }

    const [feedbacks, total] = await this.feedbackFormRepository.findAndCount({
      where,
      relations: [
        "questions",
        "category",
        "subcategory",
        "responses",
        "responses.author",
        "responses.feedbackForm.category",
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: "DESC",
      },
    });
    return {
      status: 200,
      message: "All Feedbacks List.",
      feedbacks,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }

  async findOne(id: number): Promise<FeedbackForm> {
    const feedbackForm = await this.feedbackFormRepository.findOne({
      where: { id },
      relations: [
        "questions",
        "author",
        "category",
        "subcategory",
        "responses",
        "responses.author",
      ],
    });

    if (!feedbackForm)
      throw new NotFoundException(`FeedbackForm with ID ${id} not found`);

    feedbackForm.responses = feedbackForm.responses.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return feedbackForm;
  }

  async findByCategoryId(categoryId: number): Promise<FeedbackForm[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${categoryId} not found`);

    const forms = await this.feedbackFormRepository.find({
      where: { category },
      relations: [
        "author",
        "category",
        "subcategory",
        "responses",
        "responses.author",
      ],
    });

    return forms
      .map((form) => ({
        ...form,
        responses: form.responses
          .filter((r) => r.accepted)
          .sort(
            (a, b) =>
              new Date(b.submittedAt).getTime() -
              new Date(a.submittedAt).getTime()
          ),
      }))
      .sort((a, b) => {
        const latestA = a.responses[0]?.submittedAt;
        const latestB = b.responses[0]?.submittedAt;
        return new Date(latestB).getTime() - new Date(latestA).getTime();
      });
  }

  async findByCategoryAndSubcategory(
    categoryId: number,
    subcategoryId: number
  ): Promise<FeedbackForm[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${categoryId} not found`);

    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: subcategoryId },
      relations: ["parentCategory"],
    });
    if (!subcategory)
      throw new NotFoundException(
        `Subcategory with ID ${subcategoryId} not found in Category ${categoryId}`
      );

    const forms = await this.feedbackFormRepository.find({
      where: {
        category: { id: categoryId },
        subcategory: { id: subcategoryId },
      },
      relations: [
        "author",
        "category",
        "subcategory",
        "responses",
        "responses.author",
      ],
    });

    return forms.map((form) => ({
      ...form,
      responses: form.responses.filter((r) => r.accepted),
    }));
  }

  async remove(id: number): Promise<response> {
    const result = await this.feedbackFormRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FeedbackForm with ID ${id} not found`);
    }
    return { status: 200, message: "Form Deleted Successfully." };
  }
}
