import { Test, TestingModule } from '@nestjs/testing';
import { ChecksResolver } from './checks.resolver';
import { ChecksService } from './checks.service';

describe('ChecksResolver', () => {
  let resolver: ChecksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecksResolver, ChecksService],
    }).compile();

    resolver = module.get<ChecksResolver>(ChecksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
