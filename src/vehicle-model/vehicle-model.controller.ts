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
  DeleteVehicleModelDTO,
  ReturnCreateVehicleModelDto,
  ReturnListVehicleModelDto,
  ReturnUpdateVehicleModelDto,
  UpdateVehicleModelDto,
} from './dtos/vehicle-model.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import GenericHttpBadRequestResponse from 'src/utils/interfaces/genericHttpBadRequestResponse.interface';

@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private vehicleModelService: VehicleModelService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of vehicle models',
    type: ReturnListVehicleModelDto,
    schema: {
      $ref: getSchemaPath(ReturnListVehicleModelDto),
    },
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
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
  @ApiCreatedResponse({
    description: 'Create vehicle model',
    type: ReturnCreateVehicleModelDto,
    schema: {
      $ref: getSchemaPath(ReturnCreateVehicleModelDto),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(201)
  async createVehicleModel(
    @Body() data: CreateVehicleModelDto,
  ): Promise<ReturnCreateVehicleModelDto> {
    return await this.vehicleModelService.create(data);
  }

  @Patch()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Update vehicle model',
    type: ReturnUpdateVehicleModelDto,
    schema: {
      $ref: getSchemaPath(ReturnUpdateVehicleModelDto),
    },
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  async updateVehicleModel(
    @Body() data: UpdateVehicleModelDto,
  ): Promise<ReturnUpdateVehicleModelDto> {
    return await this.vehicleModelService.update(data);
  }

  @Delete()
  @ApiResponse({
    status: 204,
    description: 'Delete vehicle model',
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(204)
  async deleteVehicleModel(@Body() data: DeleteVehicleModelDTO): Promise<void> {
    await this.vehicleModelService.delete(data.ids);
  }
}
