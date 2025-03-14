import { Test, TestingModule } from '@nestjs/testing';
import { SleepSessionController } from './sleep-session.controller';
import { SleepSessionService } from './sleep-session.service';

describe('SleepSessionController', () => {
  let controller: SleepSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepSessionController],
      providers: [SleepSessionService],
    }).compile();

    controller = module.get<SleepSessionController>(SleepSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
