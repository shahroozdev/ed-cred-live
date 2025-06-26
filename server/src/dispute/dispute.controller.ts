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
    NotFoundException,
    Delete,
    Put,
} from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFile } from '../decorators/upload-file-decorator';
import { CreateDisputeTimelineDto } from './dto/dispute-timline.dto';

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
    
    @Get()
    async listDisputes(@Query() query?: Record<string, any>) {
        return this.disputeService.listDisputes(query);
    }
    @Get('/byUser')
    @UseGuards(JwtAuthGuard)
    async listDisputesByUser(@Req() req :any, @Query() query?: Record<string, any>) {
        return this.disputeService.listDisputesByUser(req.user.id, query);
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
    @Post('/sendMessage')
    async createTimeline(@Body() dto: CreateDisputeTimelineDto) {
      return await this.disputeService.createTimline(dto);
    }
  
    @Get('/timeline/:disputeId')
    async findByDispute(@Param('disputeId') disputeId: string) {
      const timeline = await this.disputeService.findByDispute(disputeId);
      if (!timeline) {
        throw new NotFoundException('Timeline not found for this dispute');
      }
      return timeline;
    }

    @Delete('timeline/:id')
    async deleteTimeline(@Param('id') id: string) {
      return this.disputeService.remove(id);
    }

    @Put('timeline/:id')
    async updateTimeline(@Param('id') id: string, @Body() dto: Partial<CreateDisputeTimelineDto>) {
      return this.disputeService.update(id, dto);
    }
}
