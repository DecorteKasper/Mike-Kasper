import { Test, TestingModule } from '@nestjs/testing';
import { PostenService } from './posten.service';

describe('PostenService', () => {
  let service: PostenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostenService],
    }).compile();

    service = module.get<PostenService>(PostenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
