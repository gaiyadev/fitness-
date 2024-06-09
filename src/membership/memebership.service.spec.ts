import { Test, TestingModule } from '@nestjs/testing';
import { MemebershipService } from './memebership.service';

describe('MemebershipService', () => {
  let service: MemebershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemebershipService],
    }).compile();

    service = module.get<MemebershipService>(MemebershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
