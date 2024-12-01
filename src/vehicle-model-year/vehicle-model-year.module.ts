import { Module } from '@nestjs/common';
import { VehicleModelYearController } from './vehicle-model-year.controller';
import { VehicleModelYearService } from './vehicle-model-year.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [VehicleModelYearController],
  providers: [VehicleModelYearService, PrismaService],
})
export class VehicleModelYearModule {}
