import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Req,
    ForbiddenException
} from '@nestjs/common';
import { FeedbackFormService } from './feedback-form.service';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('feedback-form')
export class FeedbackFormController {
    constructor(private readonly feedbackFormService: FeedbackFormService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Req() req, @Body() createFeedbackFormDto: CreateFeedbackFormDto) {
        if (req.user.role !== "admin") {
            throw new ForbiddenException("You do not have permission to create a feedback form");
        }
        return this.feedbackFormService.create(createFeedbackFormDto);
    }

    @Get()
    findAll() {
        return this.feedbackFormService.findAll();
    }

    @Get('/forms')
    @UseGuards(JwtAuthGuard)
    findByUserCategoryId(@Req() req) {
        return this.feedbackFormService.findByUserCategoryId(req.user.id);
    }

    @Get('/groups')
    findAllGroups() {
        return this.feedbackFormService.getGroupedResponsesBySchool();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.feedbackFormService.findOne(+id);
    }

    @Get('category/:categoryId')
    async getByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
        return this.feedbackFormService.findByCategoryId(categoryId);
    }

    // @Get('category/:categoryId/subcategory/:subcategoryId')
    // async getByCategoryAndSubcategory(
    //     @Param('categoryId', ParseIntPipe) categoryId: number,
    //     @Param('subcategoryId', ParseIntPipe) subcategoryId: number
    // ): Promise<FeedbackForm[]> {
    //     return this.feedbackFormService.findByCategoryAndSubcategory(categoryId, subcategoryId);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.feedbackFormService.remove(+id);
    }
}
