import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Patch,
    UseGuards,
    Req,
} from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('disputes')
export class DisputeController {
    constructor(private readonly disputeService: DisputeService) {}

    @Post(':feedbackResponseId')
    @UseGuards(JwtAuthGuard)
    async createDispute(
        @Req() req: any,
        @Param('feedbackResponseId') feedbackResponseId: string,
        @Body() dto: CreateDisputeDto,
    ) {
        return this.disputeService.createDispute(dto, feedbackResponseId, req.user.id);
    }

    @Get(':id')
    async getDispute(@Param('id') id: string) {
        return this.disputeService.getDispute(id);
    }

    @Patch(':id')
    async updateDispute(
        @Param('id') id: string,
        @Body() dto: UpdateDisputeDto,
    ) {
        return this.disputeService.updateDispute(id, dto);
    }

    @Get()
    async listDisputes() {
        return this.disputeService.listDisputes();
    }
}
