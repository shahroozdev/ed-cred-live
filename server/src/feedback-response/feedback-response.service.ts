import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { FeedbackResponse } from "./entities/feedback-response.entity";
import { FeedbackForm } from "../feedback-form/entities/feedback-form.entity";
import { CreateFeedbackResponseDto, verifyFeedbackByAdminDto } from "./dto/create-feedback-response.dto";
import { User } from "../auth/user.entity";
import { response } from "../types";
import { School } from "../school/entities/school.entity";
import { Branch } from "../school/entities/branch.entity";
import { Employee } from "../school/entities/employee.entity";
import { Category } from "../category/category.entity";
import { EntityLog  } from "./entities/feedback-response-log.entity";

@Injectable()
export class FeedbackResponseService {
  constructor(
    @InjectRepository(FeedbackResponse)
    private readonly feedbackResponseRepository: Repository<FeedbackResponse>,
    @InjectRepository(EntityLog )
    private readonly EntityLogRepository: Repository<EntityLog >,

    @InjectRepository(FeedbackForm)
    private readonly feedbackFormRepository: Repository<FeedbackForm>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,

    @InjectRepository(Branch)
    private readonly brachRepository: Repository<Branch>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  // Create a new feedback response
  async createResponse(
    dto: CreateFeedbackResponseDto,
    authorId: number,
    attachments?: string[]
  ): Promise<response & { feedbackResponse?: FeedbackResponse }> {
    const feedbackForm = await this.feedbackFormRepository.findOne({
      where: { id: Number(dto.feedbackFormId) },
      relations: ["category"],
    });

    if (!feedbackForm) {
      throw new NotFoundException("Feedback form not found");
    }
    const user = await this.userRepository.findOne({
      where: { id: Number(authorId) },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }
    const category = await this.categoryRepository.findOne({
      where: {
        id: feedbackForm.category.id,
      },
    });
    let totalRating = 0;
    let count = 0;
    dto.answers.forEach((answer: any) => {
      if (Number.isInteger(Number(answer.answer))) {
        totalRating += Number(answer.answer);
        count++;
      }
    });
    const averageRating = Math.round(totalRating / count);
    const school = await this.schoolRepository.findOne({
      where: { name: ILike(`%${dto.details.schoolName}%`) },
      relations: [
        "branches",
        "branches.employees",
        "branches.employees.category",
      ],
    });
    let newSchool: School;
    let newBranch: Branch;
    let newEmployee: Employee;
    if (!school) {
      newSchool = this.schoolRepository.create({
        name: dto.details.schoolName,
      });
      await this.schoolRepository.save(newSchool);
      newBranch = this.brachRepository.create({
        name: dto?.details?.schoolName,
        country: dto?.details?.country,
        division: dto?.details?.divison,
        website: dto?.details?.website,
        school: newSchool,
      });
      await this.brachRepository.save(newBranch);
      newEmployee = this.employeeRepository.create({
        name: dto?.details?.revieweeName,
        category: category,
        branch: newBranch,
      });
      await this.employeeRepository.save(newEmployee);
    } else {
      const branch = school?.branches?.find(
        (branch) =>
          branch?.country.toLowerCase() ===
            dto?.details?.country.toLowerCase() &&
          branch?.division.toLowerCase() === dto?.details?.divison.toLowerCase()
      );
      if (branch) {
        newBranch = branch;
      } else {
        newBranch = this.brachRepository.create({
          name: dto?.details?.schoolName,
          country: dto?.details?.country,
          division: dto?.details?.divison,
          website: dto?.details?.website,
          school,
        });
        await this.brachRepository.save(newBranch);
      }
      const employee = newBranch?.employees?.find(
        (employee) =>
          employee?.name.toLowerCase() ===
            dto?.details?.revieweeName?.toLowerCase() &&
          employee?.category?.id === category?.id
      );
      if (employee) {
        newEmployee = employee;
      } else {
        newEmployee = this.employeeRepository.create({
          name: dto?.details?.revieweeName,
          category: category,
          branch: newBranch,
        });
        await this.employeeRepository.save(newEmployee);
      }
    }

    let feedbackResponseObject;

    if (dto?.id) {
      const response = await this.feedbackResponseRepository.findOne({
        where: { id: dto.id },
        relations: ["feedbackForm", "author", "employee", "disputes"], // include everything needed in snapshot
      });

      if (!response) {
        throw new NotFoundException("Feedback response not found");
      }
      // store snapshot
      await this.EntityLogRepository.save({
        entityName: 'FeedbackResponse',
        entityId:response?.id,
        snapshot: { ...response },
        updatedBy: user,
      });
      feedbackResponseObject = await this.feedbackResponseRepository.update(
        { id: dto.id },
        {
          feedbackForm,
          details: dto.details,
          answers: dto.answers,
          comments: dto.comments,
          avgRatting: averageRating,
          employee: newEmployee,
          ...(attachments ? { attachments } : {}),
        }
      );
    } else {
      feedbackResponseObject = this.feedbackResponseRepository.create({
        feedbackForm,
        details: dto.details,
        answers: dto.answers,
        comments: dto.comments,
        author: user,
        avgRatting: averageRating,
        agreeTerms: Boolean(dto.agreeTerms),
        employee: newEmployee,
        attachments,
      });

      feedbackResponseObject = await this.feedbackResponseRepository.save(
        feedbackResponseObject
      );
    }

    return {
      status: 200,
      message: `Response ${dto.id ? "Updated" : "Created"} Successfylly`,
      feedbackResponse: feedbackResponseObject,
    };
  }
  async getResponses(
    query?: Record<string, any>
  ): Promise<response & { responses?: FeedbackResponse[] }> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;

    const where: any = {};
    if (query.name) {
      where.feedbackForm.title = ILike(`%${query.name}%`);
    }
    const [responses, total] =
      await this.feedbackResponseRepository.findAndCount({
        where,
        relations: [
          "feedbackForm",
          "feedbackForm.category",
          "feedbackForm.subcategory",
          "feedbackForm.questions",
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: {
          submittedAt: "DESC",
        },
      });
    if (!responses || responses.length === 0) {
      return {
        status: 404,
        message: "No Feedback Responses Found.",
      };
    }

    return {
      status: 200,
      message: "All Feedback Responses List.",
      responses,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }
  // Get all responses for a specific feedback form
  async getResponsesByForm(
    feedbackFormId: string
  ): Promise<FeedbackResponse[]> {
    return await this.feedbackResponseRepository.find({
      where: {
        feedbackForm: { id: Number(feedbackFormId) },
        accepted: true, // Only return accepted feedback
      },
      relations: ["feedbackForm"],
    });
  }
  async findOneResponse(id: string) {
    return await this.feedbackResponseRepository.findOne({
      where: { id: id },
      relations: ["feedbackForm", "feedbackForm.questions"],
    });
  }
  async findRelatedResponses(responseId: string): Promise<{
    responses: FeedbackResponse[];
    related: FeedbackResponse[];
  }> {
    const baseResponse = await this.feedbackResponseRepository.findOne({
      where: { id: responseId },
      relations: [
        "feedbackForm",
        "feedbackForm.category",
        "feedbackForm.questions",
        "author",
      ],
    });

    if (!baseResponse || !baseResponse.details) {
      return { responses: [], related: [] };
    }
    const details = baseResponse.details;
    const pricipalName = details?.pricipalName?.trim();
    const schoolName = details?.schoolName?.trim();
    const schoolWebsite = details?.schoolWebsite?.trim();
    const schoolCountry = details?.schoolCountry?.trim();

    const query = this.feedbackResponseRepository
      .createQueryBuilder("feedback_response")
      .leftJoinAndSelect("feedback_response.feedbackForm", "feedback_form")
      .leftJoinAndSelect("feedback_form.category", "category")
      .leftJoinAndSelect("feedback_form.questions", "questions")
      .leftJoinAndSelect("feedback_response.author", "author")
      .leftJoinAndSelect("author.category", "author_category");

    let responses: FeedbackResponse[] = [];
    let related: FeedbackResponse[] = [];

    if (pricipalName) {
      // Match by principal + school
      responses = await query
        .where(
          "feedback_response.details->>'pricipalName' ILIKE :pricipalName",
          { pricipalName }
        )
        .andWhere(
          "feedback_response.details->>'schoolName' ILIKE :schoolName",
          { schoolName }
        )
        .andWhere(
          "feedback_response.details->>'schoolWebsite' ILIKE :schoolWebsite",
          { schoolWebsite }
        )
        .andWhere(
          "feedback_response.details->>'schoolCountry' ILIKE :schoolCountry",
          { schoolCountry }
        )
        .getMany();

      const schoolResponses = await this.feedbackResponseRepository
        .createQueryBuilder("feedback_response")
        .leftJoinAndSelect("feedback_response.feedbackForm", "feedback_form")
        .leftJoinAndSelect("feedback_form.category", "category")
        .leftJoinAndSelect("feedback_response.author", "author")
        .where("feedback_response.details->>'schoolName' ILIKE :schoolName", {
          schoolName,
        })
        .andWhere(
          "feedback_response.details->>'schoolWebsite' ILIKE :schoolWebsite",
          { schoolWebsite }
        )
        .andWhere(
          "feedback_response.details->>'schoolCountry' ILIKE :schoolCountry",
          { schoolCountry }
        )
        .getMany();

      // Now filter the responses to find those with no principal name
      const schoolResponsesWithoutPrincipal = schoolResponses.filter(
        (response) => !response.details?.pricipalName
      );

      if (schoolResponsesWithoutPrincipal.length > 0) {
        // Get the latest response without a principal name
        const latestSchoolResponse = schoolResponsesWithoutPrincipal.reduce(
          (latest, current) => {
            return !latest ||
              new Date(current.submittedAt) > new Date(latest.submittedAt)
              ? current
              : latest;
          },
          null as FeedbackResponse | null
        );

        if (latestSchoolResponse) {
          related.push(latestSchoolResponse);
        }
      }
    } else if (!pricipalName && schoolName && schoolWebsite && schoolCountry) {
      // Match by school
      responses = await query
        .where("feedback_response.details->>'schoolName' ILIKE :schoolName", {
          schoolName,
        })
        .andWhere(
          "feedback_response.details->>'schoolWebsite' ILIKE :schoolWebsite",
          { schoolWebsite }
        )
        .andWhere(
          "feedback_response.details->>'schoolCountry' ILIKE :schoolCountry",
          { schoolCountry }
        )
        .getMany();

      // Get the latest response for each principal
      const principalMap = new Map<string, FeedbackResponse>();
      for (const r of responses) {
        const pName = r.details.pricipalName?.trim();
        if (!pName) continue;
        const existing = principalMap.get(pName);
        if (
          !existing ||
          new Date(r.submittedAt) > new Date(existing.submittedAt)
        ) {
          principalMap.set(pName, r);
        }
      }

      related = Array.from(principalMap.values());
    }

    return { responses, related };
  }

  // Delete a feedback response
  async deleteResponse(responseId: string): Promise<void> {
    const result = await this.feedbackResponseRepository.delete(
      Number(responseId)
    );
    if (result.affected === 0) {
      throw new NotFoundException("Feedback response not found");
    }
  }

  async acceptFeedback(
    id: string,
    type: "accept" | "reject"
  ): Promise<response> {
    const response = await this.feedbackResponseRepository.findOne({
      where: { id },
    });
    if (!response) throw new NotFoundException("Feedback not found");

    response.accepted = type === "accept" ? true : false;
    response.status = type === "accept" ? "Accepted" : "Rejected";
    await this.feedbackResponseRepository.save(response);
    return {
      status: 200,
      message: `Feedback Response ${type === "accept" ? "Accepted" : "Rejected"} Successfully.`,
    };
  }

  async deleteFeedback(id: string): Promise<void> {
    const response = await this.feedbackResponseRepository.findOne({
      where: { id },
    });
    if (!response) throw new NotFoundException("Feedback not found");
    await this.feedbackResponseRepository.remove(response);
  }

  async getLastFourFeedbacks(): Promise<FeedbackResponse[]> {
    return this.feedbackResponseRepository.find({
      order: { submittedAt: "DESC" },
      take: 4,
      where: { accepted: true },
    });
  }

  async verifyFeedback(dto: verifyFeedbackByAdminDto): Promise<response> {
    const response = await this.feedbackResponseRepository.findOne({
      where: { id :dto?.id},
    });
    if (!response) throw new NotFoundException("Feedback not found");
    response.verifierComment = dto?.verifierComment;
    response.isVerified = true;
    await this.feedbackResponseRepository.save(response);
    return {
      status: 200,
      message: `Feedback Response Verified Successfully.`,
    };
  }
}
