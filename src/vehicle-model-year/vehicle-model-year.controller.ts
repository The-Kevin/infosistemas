import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IVehicleModelYear } from './interfaces/vehicle-model-year.interface';
import { VehicleModelYearService } from './vehicle-model-year.service';
import {
  CreateVehicleModelYearDto,
  ReturnListVehicleModelYearDto,
  UpdateVehicleModelYearDto,
} from './dtos/vehicle-model-year.dto';

@Controller('vehicle-model-year')
export class VehicleModelYearController {
  constructor(private vehicleModelYearService: VehicleModelYearService) {}

  @Post()
  @HttpCode(201)
  async createVehicleModelYear(
    @Body() data: CreateVehicleModelYearDto,
  ): Promise<IVehicleModelYear> {
    return await this.vehicleModelYearService.create(data);
  }

  @Get()
  @HttpCode(200)
  async listVehicleModelYear(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'name',
  ): Promise<ReturnListVehicleModelYearDto> {
    return await this.vehicleModelYearService.list({
      page,
      limit,
      sort,
    });
  }

  @Patch()
  @HttpCode(200)
  async update(
    @Body() data: UpdateVehicleModelYearDto,
  ): Promise<IVehicleModelYear> {
    return await this.vehicleModelYearService.update(data);
  }

  @Delete()
  @HttpCode(204)
  async delete(@Body() data: { ids: string[] }) {
    await this.vehicleModelYearService.delete(data.ids);
    return 'ok';
  }
}
