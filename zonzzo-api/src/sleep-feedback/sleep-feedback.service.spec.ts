import { Test, TestingModule } from '@nestjs/testing';
import { SleepFeedbackService } from './sleep-feedback.service';

describe('SleepFeedbackService', () => {
  let service: SleepFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepFeedbackService],
    }).compile();

    service = module.get<SleepFeedbackService>(SleepFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
