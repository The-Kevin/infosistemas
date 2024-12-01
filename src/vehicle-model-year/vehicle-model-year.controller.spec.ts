import { Test, TestingModule } from '@nestjs/testing';
import { VehicleModelYearController } from './vehicle-model-year.controller';

describe('VehicleModelYearController', () => {
  let controller: VehicleModelYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleModelYearController],
    }).compile();

    controller = module.get<VehicleModelYearController>(
      VehicleModelYearController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
