import { Module } from '@nestjs/common';
import { VehicleModelService } from './vehicle-model.service';
import { VehicleModelController } from './vehicle-model.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [VehicleModelService, PrismaService],
  controllers: [VehicleModelController],
})
export class VehicleModelModule {}
