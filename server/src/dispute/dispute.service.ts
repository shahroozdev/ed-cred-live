import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dispute } from "./entities/dispute.entity";
import { FeedbackResponse } from "../feedback-response/entities/feedback-response.entity";
import { CreateDisputeDto } from "./dto/create-dispute.dto";
import { UpdateDisputeDto } from "./dto/update-dispute.dto";
import { User } from "../auth/user.entity";
import { response } from "types";
import { DisputeTimeline } from "./entities/dispute.timeline.entity";
import { CreateDisputeTimelineDto } from "./dto/dispute-timline.dto";

@Injectable()
export class DisputeService {
  constructor(
    @InjectRepository(Dispute)
    private readonly disputeRepository: Repository<Dispute>,

    @InjectRepository(FeedbackResponse)
    private readonly feedbackResponseRepository: Repository<FeedbackResponse>,

    @InjectRepository(DisputeTimeline)
    private readonly timelineRepo: Repository<DisputeTimeline>
  ) {}

  async createDispute(
    dto: CreateDisputeDto,
    feedbackResponseId: string,
    userId: number,
    url?: string
  ): Promise<response> {
    const feedbackResponse = await this.feedbackResponseRepository.findOne({
      where: { id: feedbackResponseId },
      relations: ["author"],
    });

    if (!feedbackResponse) {
      throw new NotFoundException("Feedback response not found.");
    }

    if (!feedbackResponse.accepted) {
      throw new BadRequestException(
        "You can only dispute live (accepted) responses."
      );
    }

    const existing = await this.disputeRepository.findOne({
      where: {
        feedbackResponse: { id: feedbackResponseId },
        disputedBy: { id: userId },
      },
    });

    if (existing) {
      throw new BadRequestException(
        "You have already submitted a dispute for this response."
      );
    }

    const dispute = this.disputeRepository.create({
      feedbackResponse,
      disputedBy: { id: userId } as User,
      reason: dto.reason,
      attachment: url,
    });
    const timeline = this.timelineRepo.create({
      dispute,
      message: "Dispute created Successfully.",
      sender: "admin",
    });
    await this.timelineRepo.save(timeline);
    await this.disputeRepository.save(dispute);
    return {
      status: 200,
      message: "A dispute on this response has been created successfully.",
    };
  }

  async getDispute(id: string) {
    const dispute = await this.disputeRepository.findOne({
      where: { id },
      relations: [
        "feedbackResponse",
        "disputedBy",
        "feedbackResponse.feedbackForm",
        "feedbackResponse.feedbackForm.questions",
        "timeline",
      ],
    });

    if (!dispute) {
      throw new NotFoundException("Dispute not found.");
    }

    return dispute;
  }

  async updateDispute(id: string, dto: UpdateDisputeDto) {
    const dispute = await this.disputeRepository.findOneBy({ id });

    if (!dispute) {
      throw new NotFoundException("Dispute not found.");
    }

    if (dto.status) {
      dispute.status = dto.status;
    }

    if (dto.adminNotes !== undefined) {
      dispute.adminNotes = dto.adminNotes;
    }

    return await this.disputeRepository.save(dispute);
  }

  async listDisputes(
    query?: Record<string, any>
  ): Promise<response & { disputes?: Dispute[] }> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;
    const where: any = {};
    const [disputes, total] = await this.disputeRepository.findAndCount({
      where,
      relations: [
        "feedbackResponse",
        "disputedBy",
        "feedbackResponse.feedbackForm",
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: "DESC" },
    });
    return {
      status: 200,
      message: "All Feedback Responses List.",
      disputes,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }
  async listDisputesByUser(
    userId: number,
    query?: Record<string, any>
  ): Promise<response & { disputes?: Dispute[] }> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;
    const where: any = { disputedBy: { id: userId } };
    const [disputes, total] = await this.disputeRepository
      .createQueryBuilder("dispute")
      .leftJoinAndSelect("dispute.disputedBy", "disputedBy")
      .leftJoinAndSelect("dispute.feedbackResponse", "feedbackResponse")
      .leftJoinAndSelect("feedbackResponse.feedbackForm", "feedbackForm")
      .leftJoinAndSelect("feedbackForm.questions", "questions")
      .leftJoinAndSelect("dispute.timeline", "timeline")
      .where(where) // if `where` is a valid object or condition
      .orderBy("dispute.createdAt", "DESC")
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      status: 200,
      message: "All Feedback Responses List.",
      disputes,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }
  async deleteDispute(id: string):Promise<response> {
    const dispute = await this.disputeRepository.findOne({
      where: { id },
    });
    if (!dispute) throw new NotFoundException("Dispute not found");
     await this.disputeRepository.remove(dispute);
     return {status:200 , message:'Dispute Deleted Successfully.'}
  }
  async getDisputeStats() {
    const [resolvedDisputes, totalResolved] =
      await this.disputeRepository.findAndCount({
        where: { status: "resolved" },
      });
    const [pendingDisputes, totalPending] =
      await this.disputeRepository.findAndCount({
        where: { status: "pending" },
      });
    const [rejectedDisputes, totalRejected] =
      await this.disputeRepository.findAndCount({
        where: { status: "rejected" },
      });
    return {
      status: 200,
      message: "All Stats of Disputes",
      disputesStats: { totalPending, totalRejected, totalResolved },
    };
  }
  async updateDisputeStatus(id:string, status:"pending" | "reviewed" | "resolved" | "rejected"){
    const dispute = await this.disputeRepository.findOne({
      where: { id },
    });
    if (!dispute) throw new NotFoundException("Dispute not found");
    dispute.status=status;
    await this.disputeRepository.save(dispute);
    return {status:200, message:`Dispute ${status} Successfully.`}
  }
  async createTimline(dto: CreateDisputeTimelineDto, role:string, url?:string) {
    const { disputeId, message } = dto;

    const dispute = await this.disputeRepository.findOne({
      where: { id: disputeId },
    });
    if (!dispute) throw new NotFoundException("Dispute not found");
    if(dispute.status==="pending" && role==="admin"){
      dispute.status="reviewed";
      await this.disputeRepository.save(dispute);
    }

    const timeline = this.timelineRepo.create({
      message,
      attachment:url,
      sender:role==='admin'?'admin':'user',
      dispute,
    });

     await this.timelineRepo.save(timeline);
     return {status:200, message:'Message Sent Successfully.'}
  }

  async findByDispute(disputeId: string) {
    return await this.timelineRepo.find({
      where: { dispute: { id: disputeId } },
      order: { createdAt: "ASC" },
      relations: ["createdBy"],
    });
  }

  async findTimeline(id: string) {
    const timeline = await this.timelineRepo.findOne({
      where: { id },
      relations: ["dispute"],
    });
    if (!timeline) throw new NotFoundException("Timeline message not found");
    return timeline;
  }

  async update(id: string, updateData: Partial<DisputeTimeline>) {
    const timeline = await this.timelineRepo.findOne({
      where: { id },
      relations: ["dispute"],
    });
    if (!timeline) throw new NotFoundException("Timeline message not found");
    Object.assign(timeline, updateData);
    return await this.timelineRepo.save(timeline);
  }

  async remove(id: string) {
    const timeline = await this.timelineRepo.findOne({ where: { id } });
    if (!timeline) throw new NotFoundException("Timeline message not found");
    return await this.timelineRepo.remove(timeline);
  }
}
