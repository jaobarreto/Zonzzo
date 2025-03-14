import { Test, TestingModule } from '@nestjs/testing';
import { SleepSessionService } from './sleep-session.service';

describe('SleepSessionService', () => {
  let service: SleepSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepSessionService],
    }).compile();

    service = module.get<SleepSessionService>(SleepSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
