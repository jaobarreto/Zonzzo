import { Test, TestingModule } from '@nestjs/testing';
import { SleepReportController } from './sleep-report.controller';
import { SleepReportService } from './sleep-report.service';

describe('SleepReportController', () => {
  let controller: SleepReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepReportController],
      providers: [SleepReportService],
    }).compile();

    controller = module.get<SleepReportController>(SleepReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
