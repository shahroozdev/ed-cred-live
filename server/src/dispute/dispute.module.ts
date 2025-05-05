import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisputeController } from './dispute.controller';
import { DisputeService } from './dispute.service';
import { Dispute } from './dispute.entity';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Dispute, FeedbackResponse])],
    controllers: [DisputeController],
    providers: [DisputeService],
    exports: [DisputeService],
})
export class DisputeModule {}
