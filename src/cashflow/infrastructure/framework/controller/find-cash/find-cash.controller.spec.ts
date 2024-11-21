import { Test, TestingModule } from '@nestjs/testing';
import { FindCashController } from './find-cash.controller';

describe('FindCashController', () => {
  let controller: FindCashController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindCashController],
    }).compile();

    controller = module.get<FindCashController>(FindCashController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
