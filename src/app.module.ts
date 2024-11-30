import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.module';
import { VehicleModelModule } from './vehicle-model/vehicle-model.module';

@Module({
  imports: [BrandsModule, VehicleModelModule],
})
export class AppModule {}
