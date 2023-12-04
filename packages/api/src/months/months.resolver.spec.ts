import { Test, TestingModule } from '@nestjs/testing';
import { MonthsResolver } from './months.resolver';
import { MonthsService } from './months.service';

describe('MonthsResolver', () => {
  let resolver: MonthsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthsResolver, MonthsService],
    }).compile();

    resolver = module.get<MonthsResolver>(MonthsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
