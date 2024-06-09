import { Test, TestingModule } from '@nestjs/testing';
import { MemebershipController } from './memebership.controller';
import { MemebershipService } from './memebership.service';

describe('MemebershipController', () => {
  let controller: MemebershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemebershipController],
      providers: [MemebershipService],
    }).compile();

    controller = module.get<MemebershipController>(MemebershipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
