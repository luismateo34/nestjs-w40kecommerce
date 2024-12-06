import { Test, TestingModule } from '@nestjs/testing';
import { FindClientIdService } from './find-client-id.service';

describe('FindClientIdService', () => {
  let service: FindClientIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindClientIdService],
    }).compile();

    service = module.get<FindClientIdService>(FindClientIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
