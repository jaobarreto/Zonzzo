import { Test, TestingModule } from '@nestjs/testing';
import { SleepReportService } from './sleep-report.service';

describe('SleepReportService', () => {
  let service: SleepReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepReportService],
    }).compile();

    service = module.get<SleepReportService>(SleepReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
