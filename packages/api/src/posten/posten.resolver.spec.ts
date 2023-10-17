import { Test, TestingModule } from '@nestjs/testing';
import { PostenResolver } from './posten.resolver';
import { PostenService } from './posten.service';

describe('PostenResolver', () => {
  let resolver: PostenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostenResolver, PostenService],
    }).compile();

    resolver = module.get<PostenResolver>(PostenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
