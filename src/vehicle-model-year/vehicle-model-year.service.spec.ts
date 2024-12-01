import { Test, TestingModule } from '@nestjs/testing';
import { VehicleModelYearService } from './vehicle-model-year.service';

describe('VehicleModelYearService', () => {
  let service: VehicleModelYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleModelYearService],
    }).compile();

    service = module.get<VehicleModelYearService>(VehicleModelYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
