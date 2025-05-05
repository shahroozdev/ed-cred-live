import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumQuestionService } from './forum-question.service';
import { CreateForumQuestionDto } from './dto/create-forum-question.dto';
import { UpdateForumQuestionDto } from './dto/update-forum-question.dto';

@Controller('forum-question')
export class ForumQuestionController {
    constructor(private readonly forumQuestionService: ForumQuestionService) {}

    @Post()
    create(@Body() createForumQuestionDto: CreateForumQuestionDto) {
        return this.forumQuestionService.create(createForumQuestionDto);
    }

    @Get()
    findAll() {
        return this.forumQuestionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.forumQuestionService.getQuestionById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateForumQuestionDto: UpdateForumQuestionDto) {
        return this.forumQuestionService.update(+id, updateForumQuestionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.forumQuestionService.removeQuestion(+id);
    }
}
