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
import { VehicleModelService } from './vehicle-model.service';
import {
  CreateVehicleModelDto,
  ReturnCreateVehicleModelDto,
  ReturnListVehicleModelDto,
  UpdateVehicleModelDto,
} from './dtos/vehicle-model.dto';
import { IVehicleModel } from './interfaces/vehicle-model.interface';

@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private vehicleModelService: VehicleModelService) {}

  @Get()
  @HttpCode(200)
  async listVehicleModel(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'name',
  ): Promise<ReturnListVehicleModelDto> {
    return await this.vehicleModelService.list({
      limit,
      page,
      sort,
    });
  }

  @Post()
  @HttpCode(201)
  async createVehicleModel(
    @Body() data: CreateVehicleModelDto,
  ): Promise<ReturnCreateVehicleModelDto> {
    return await this.vehicleModelService.create(data);
  }

  @Patch()
  @HttpCode(200)
  async updateVehicleModel(
    @Body() data: UpdateVehicleModelDto,
  ): Promise<IVehicleModel> {
    return await this.vehicleModelService.update(data.id, {
      brandId: data.body.brandId,
      name: data.body.name,
    });
  }

  @Delete()
  @HttpCode(204)
  async deleteVehicleModel(@Body() data: { ids: string[] }): Promise<void> {
    await this.vehicleModelService.delete(data.ids);
  }
}
