import { Test, TestingModule } from '@nestjs/testing';
import { LocalClientService } from './local-client.service';

describe('LocalClientService', () => {
  let service: LocalClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalClientService],
    }).compile();

    service = module.get<LocalClientService>(LocalClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
