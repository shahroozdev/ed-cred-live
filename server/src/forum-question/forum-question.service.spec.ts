import { Test, TestingModule } from '@nestjs/testing';
import { ForumQuestionService } from './forum-question.service';

describe('ForumQuestionService', () => {
  let service: ForumQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumQuestionService],
    }).compile();

    service = module.get<ForumQuestionService>(ForumQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
