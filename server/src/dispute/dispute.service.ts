import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './dispute.entity';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class DisputeService {
    constructor(
        @InjectRepository(Dispute)
        private readonly disputeRepository: Repository<Dispute>,

        @InjectRepository(FeedbackResponse)
        private readonly feedbackResponseRepository: Repository<FeedbackResponse>,
    ) {}

    async createDispute(dto: CreateDisputeDto, feedbackResponseId: string, userId: number) {

        const feedbackResponse = await this.feedbackResponseRepository.findOne({
            where: { id: feedbackResponseId },
            relations: ['author'],
        });

        if (!feedbackResponse) {
            throw new NotFoundException('Feedback response not found.');
        }

        if (!feedbackResponse.accepted) {
            throw new BadRequestException('You can only dispute live (accepted) responses.');
        }

        const existing = await this.disputeRepository.findOne({
            where: {
                feedbackResponse: { id: feedbackResponseId },
                disputedBy: { id: userId },
            },
        });

        if (existing) {
            throw new BadRequestException('You have already submitted a dispute for this response.');
        }

        const dispute = this.disputeRepository.create({
            feedbackResponse,
            disputedBy: { id: userId } as User,
            reason: dto.reason,
            additionalInfo: dto.additionalInfo,
        });

        return await this.disputeRepository.save(dispute);
    }

    async getDispute(id: string) {
        const dispute = await this.disputeRepository.findOne({
            where: { id },
            relations: ['feedbackResponse', 'disputedBy'],
        });

        if (!dispute) {
            throw new NotFoundException('Dispute not found.');
        }

        return dispute;
    }

    async updateDispute(id: string, dto: UpdateDisputeDto) {
        const dispute = await this.disputeRepository.findOneBy({ id });

        if (!dispute) {
            throw new NotFoundException('Dispute not found.');
        }

        if (dto.status) {
            dispute.status = dto.status;
        }

        if (dto.adminNotes !== undefined) {
            dispute.adminNotes = dto.adminNotes;
        }

        return await this.disputeRepository.save(dispute);
    }

    async listDisputes() {
        return await this.disputeRepository.find({
            relations: ['feedbackResponse', 'disputedBy', 'feedbackResponse.feedbackForm'],
            order: { createdAt: 'DESC' },
        });
    }
}
