import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEventController } from './update-event.controller';

describe('UpdateEventController', () => {
  let controller: UpdateEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateEventController],
    }).compile();

    controller = module.get<UpdateEventController>(UpdateEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
