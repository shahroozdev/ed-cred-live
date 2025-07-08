import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisputeController } from './dispute.controller';
import { DisputeService } from './dispute.service';
import { Dispute } from './entities/dispute.entity';
import { FeedbackResponse } from '../feedback-response/entities/feedback-response.entity';
import { DisputeTimeline } from './entities/dispute.timeline.entity';
import { User } from '../auth/user.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Dispute, FeedbackResponse, DisputeTimeline, User])],
    controllers: [DisputeController],
    providers: [DisputeService],
    exports: [DisputeService],
})
export class DisputeModule {}
