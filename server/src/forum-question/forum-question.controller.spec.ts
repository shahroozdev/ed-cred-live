import { Test, TestingModule } from '@nestjs/testing';
import { ForumQuestionController } from './forum-question.controller';
import { ForumQuestionService } from './forum-question.service';

describe('ForumQuestionController', () => {
  let controller: ForumQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumQuestionController],
      providers: [ForumQuestionService],
    }).compile();

    controller = module.get<ForumQuestionController>(ForumQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
