import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Patch,
    UseGuards,
    Req,
    UploadedFile,
    Query,
} from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFile } from '../decorators/upload-file-decorator';

@Controller('disputes')
export class DisputeController {
    constructor(private readonly disputeService: DisputeService) {}

    @Post(':feedbackResponseId')
    @UseGuards(JwtAuthGuard)
    @ApiConsumes("multipart/form-data")
    @UploadFile("attachment", { folder: "dispute-documents" })
    async createDispute(
        @Req() req: any,
        @UploadedFile() attachment: Express.Multer.File,
        @Param('feedbackResponseId') feedbackResponseId: string,
        @Body() dto: CreateDisputeDto,
    ) {
        const url = attachment
        ? `/uploads/dispute-documents/${attachment?.filename}`
        : null;
        return this.disputeService.createDispute(dto, feedbackResponseId, req.user.id, url);
    }

    @Get('/stats')
    async getDisputeStats() {
        return this.disputeService.getDisputeStats();
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
    async listDisputes(@Query() query?: Record<string, any>) {
        return this.disputeService.listDisputes(query);
    }
}
