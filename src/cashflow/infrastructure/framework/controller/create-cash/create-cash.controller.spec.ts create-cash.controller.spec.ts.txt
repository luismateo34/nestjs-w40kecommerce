import { Test, TestingModule } from '@nestjs/testing';
import { CreateCashController } from './create-cash.controller';

describe('CreateCashController', () => {
  let controller: CreateCashController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCashController],
    }).compile();

    controller = module.get<CreateCashController>(CreateCashController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
