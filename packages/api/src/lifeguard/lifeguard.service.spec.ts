import { Test, TestingModule } from '@nestjs/testing';
import { LifeguardService } from './lifeguard.service';

describe('LifeguardService', () => {
  let service: LifeguardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeguardService],
    }).compile();

    service = module.get<LifeguardService>(LifeguardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
