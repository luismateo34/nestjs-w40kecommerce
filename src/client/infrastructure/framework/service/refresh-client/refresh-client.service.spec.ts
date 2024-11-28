import { Test, TestingModule } from '@nestjs/testing';
import { RefreshClientService } from './refresh-client.service';

describe('RefreshClientService', () => {
  let service: RefreshClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshClientService],
    }).compile();

    service = module.get<RefreshClientService>(RefreshClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
