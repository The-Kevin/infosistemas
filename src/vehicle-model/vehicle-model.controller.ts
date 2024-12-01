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
  ListVehicleModelDto,
  ReturnListVehicleModelDto,
  UpdateVehicleModelDto,
} from './dtos/vehicle-model.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
  OmitType,
} from '@nestjs/swagger';
import GenericHttpBadRequestResponse from 'src/utils/interfaces/genericHttpBadRequestResponse.interface';
import { IVehicleModel } from './interfaces/vehicle-model.interface';

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
    @Query() query: ListVehicleModelDto,
  ): Promise<ReturnListVehicleModelDto> {
    const { limit, page, sort } = query;
    return await this.vehicleModelService.list({
      limit,
      page,
      sort,
    });
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create vehicle model',
    type: OmitType(IVehicleModel, ['vehicleModelYears']),
    schema: {
      $ref: getSchemaPath(IVehicleModel),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(201)
  async createVehicleModel(
    @Body() data: CreateVehicleModelDto,
  ): Promise<IVehicleModel> {
    return await this.vehicleModelService.create(data);
  }

  @Patch()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Update vehicle model',
    type: IVehicleModel,
    schema: {
      $ref: getSchemaPath(IVehicleModel),
    },
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  async updateVehicleModel(
    @Body() data: UpdateVehicleModelDto,
  ): Promise<IVehicleModel> {
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
