import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.module';
import { VehicleModelModule } from './vehicle-model/vehicle-model.module';
import { VehicleModelYearModule } from './vehicle-model-year/vehicle-model-year.module';

@Module({
  imports: [BrandsModule, VehicleModelModule, VehicleModelYearModule],
})
export class AppModule {}
