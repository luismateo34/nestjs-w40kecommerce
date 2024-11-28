import { Test, TestingModule } from '@nestjs/testing';
import { JwtClientService } from './jwt-client.service';

describe('JwtClientService', () => {
  let service: JwtClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtClientService],
    }).compile();

    service = module.get<JwtClientService>(JwtClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
