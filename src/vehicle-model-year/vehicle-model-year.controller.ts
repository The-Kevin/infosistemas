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
  DeleteVehicleModelYearsDTO,
  ListVehicleModelYearDto,
  ReturnListVehicleModelYearDto,
  UpdateVehicleModelYearDto,
} from './dtos/vehicle-model-year.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import GenericHttpBadRequestResponse from 'src/utils/interfaces/genericHttpBadRequestResponse.interface';

@Controller('vehicle-model-year')
export class VehicleModelYearController {
  constructor(private vehicleModelYearService: VehicleModelYearService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create vehicle model year',
    type: IVehicleModelYear,
    schema: {
      $ref: getSchemaPath(IVehicleModelYear),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(201)
  async createVehicleModelYear(
    @Body() data: CreateVehicleModelYearDto,
  ): Promise<IVehicleModelYear> {
    return await this.vehicleModelYearService.create(data);
  }

  @Get()
  @ApiOkResponse({
    description: 'List vehicle model years',
    type: ReturnListVehicleModelYearDto,
    schema: {
      $ref: getSchemaPath(ReturnListVehicleModelYearDto),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(200)
  async listVehicleModelYear(
    @Query() query: ListVehicleModelYearDto,
  ): Promise<ReturnListVehicleModelYearDto> {
    const { page, limit, sort } = query;
    return await this.vehicleModelYearService.list({
      page,
      limit,
      sort,
    });
  }

  @Patch()
  @ApiOkResponse({
    description: 'Update vehicle model',
    type: IVehicleModelYear,
    schema: {
      $ref: getSchemaPath(IVehicleModelYear),
    },
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(200)
  async update(
    @Body() data: UpdateVehicleModelYearDto,
  ): Promise<IVehicleModelYear> {
    return await this.vehicleModelYearService.update(data);
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
  async delete(@Body() data: DeleteVehicleModelYearsDTO): Promise<void> {
    await this.vehicleModelYearService.delete(data.ids);
  }
}
