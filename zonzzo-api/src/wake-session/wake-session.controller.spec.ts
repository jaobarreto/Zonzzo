import { Test, TestingModule } from '@nestjs/testing';
import { WakeSessionController } from './wake-session.controller';
import { WakeSessionService } from './wake-session.service';

describe('WakeSessionController', () => {
  let controller: WakeSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WakeSessionController],
      providers: [WakeSessionService],
    }).compile();

    controller = module.get<WakeSessionController>(WakeSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
