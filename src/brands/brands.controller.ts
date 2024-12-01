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
import {
  CreateBrandDTO,
  DeleteBrandDTO,
  ReturnCreateBrandDTO,
  ReturnListBrandsDTO,
  ReturnUpdateBrandDTO,
  UpdateBrandDTO,
} from './dtos/brand.dto';
import { BrandsService } from './brands.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import GenericHttpBadRequestResponse from 'src/utils/interfaces/genericHttpBadRequestResponse.interface';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of brands',
    type: ReturnListBrandsDTO,
    schema: {
      $ref: getSchemaPath(ReturnListBrandsDTO),
    },
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(200)
  async listBrands(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'name',
  ): Promise<ReturnListBrandsDTO> {
    limit = Math.min(limit, 100);

    return await this.brandService.list({
      page,
      limit,
      sort,
    });
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create brands',
    type: ReturnCreateBrandDTO,
    schema: {
      $ref: getSchemaPath(ReturnCreateBrandDTO),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(201)
  async createBrand(
    @Body() createBrandDto: CreateBrandDTO,
  ): Promise<ReturnCreateBrandDTO> {
    return await this.brandService.create(createBrandDto);
  }

  @Patch()
  @ApiOkResponse({
    description: 'Update brands',
    type: ReturnUpdateBrandDTO,
    schema: {
      $ref: getSchemaPath(ReturnUpdateBrandDTO),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(200)
  async updateBrand(
    @Body() updateBrandDto: UpdateBrandDTO,
  ): Promise<ReturnUpdateBrandDTO> {
    return await this.brandService.update(updateBrandDto);
  }

  @Delete()
  @ApiResponse({
    status: 204,
    description: 'Delete brands',
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(204)
  async deleteBrand(@Body() data: DeleteBrandDTO): Promise<void> {
    await this.brandService.delete(data.ids);
  }
}
