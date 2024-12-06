import { Test, TestingModule } from '@nestjs/testing';
import { UpadateEventService } from './upadate-event.service';

describe('UpadateEventService', () => {
  let service: UpadateEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpadateEventService],
    }).compile();

    service = module.get<UpadateEventService>(UpadateEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
