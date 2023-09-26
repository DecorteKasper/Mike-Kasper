import { Test, TestingModule } from '@nestjs/testing';
import { LifeguardResolver } from './lifeguard.resolver';
import { LifeguardService } from './lifeguard.service';

describe('LifeguardResolver', () => {
  let resolver: LifeguardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeguardResolver, LifeguardService],
    }).compile();

    resolver = module.get<LifeguardResolver>(LifeguardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
