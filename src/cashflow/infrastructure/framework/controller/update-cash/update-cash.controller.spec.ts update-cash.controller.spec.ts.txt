import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCashController } from './update-cash.controller';

describe('UpdateCashController', () => {
  let controller: UpdateCashController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCashController],
    }).compile();

    controller = module.get<UpdateCashController>(UpdateCashController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
