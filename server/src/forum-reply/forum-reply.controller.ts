import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ForumReplyService } from './forum-reply.service';
import { CreateForumReplyDto } from './dto/create-forum-reply.dto';

@Controller('forum-reply')
export class ForumReplyController {
    constructor(private readonly forumReplyService: ForumReplyService) {}

    @Post()
    create(@Body() createForumReplyDto: CreateForumReplyDto) {
        return this.forumReplyService.create(createForumReplyDto);
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
