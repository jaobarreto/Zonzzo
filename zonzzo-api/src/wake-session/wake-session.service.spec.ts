import { Test, TestingModule } from '@nestjs/testing';
import { WakeSessionService } from './wake-session.service';

describe('WakeSessionService', () => {
  let service: WakeSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WakeSessionService],
    }).compile();

    service = module.get<WakeSessionService>(WakeSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
