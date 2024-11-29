import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService],
})
export class BrandsModule {}
