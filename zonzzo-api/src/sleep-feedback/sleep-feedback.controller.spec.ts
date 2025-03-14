import { Test, TestingModule } from '@nestjs/testing';
import { SleepFeedbackController } from './sleep-feedback.controller';
import { SleepFeedbackService } from './sleep-feedback.service';

describe('SleepFeedbackController', () => {
  let controller: SleepFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepFeedbackController],
      providers: [SleepFeedbackService],
    }).compile();

    controller = module.get<SleepFeedbackController>(SleepFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
