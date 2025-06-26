import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisputeController } from './dispute.controller';
import { DisputeService } from './dispute.service';
import { Dispute } from './entities/dispute.entity';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';
import { DisputeTimeline } from './entities/dispute.timeline.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Dispute, FeedbackResponse, DisputeTimeline])],
    controllers: [DisputeController],
    providers: [DisputeService],
    exports: [DisputeService],
})
export class DisputeModule {}
