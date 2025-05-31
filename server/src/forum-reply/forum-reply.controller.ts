import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ForumReplyService } from './forum-reply.service';
import { CreateForumReplyDto } from './dto/create-forum-reply.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { apiWrapper } from 'src/decorators/globalErrorHandlerClass';

@Controller('forum-reply')
export class ForumReplyController {
    constructor(private readonly forumReplyService: ForumReplyService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req, @Body() createForumReplyDto: CreateForumReplyDto) {
        return apiWrapper(()=>this.forumReplyService.create(createForumReplyDto, req.user.id));
    }

    @Get()
    findAll() {
        return this.forumReplyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.forumReplyService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.forumReplyService.remove(+id);
    }
}
