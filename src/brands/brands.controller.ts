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
  ListBrandDto,
  ReturnListBrandsDTO,
  UpdateBrandDTO,
} from './dtos/brand.dto';
import { BrandsService } from './brands.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
  OmitType,
} from '@nestjs/swagger';
import GenericHttpBadRequestResponse from 'src/utils/interfaces/genericHttpBadRequestResponse.interface';
import { IBrand } from './interfaces/brand.interface';

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
  async listBrands(@Query() query: ListBrandDto): Promise<ReturnListBrandsDTO> {
    const { limit, page, sort } = query;
    return await this.brandService.list({
      page,
      limit,
      sort,
    });
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create brands',
    type: OmitType(IBrand, ['models']),
    schema: {
      $ref: getSchemaPath(IBrand),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(201)
  async createBrand(@Body() createBrandDto: CreateBrandDTO): Promise<IBrand> {
    return await this.brandService.create(createBrandDto);
  }

  @Patch()
  @ApiOkResponse({
    description: 'Update brands',
    type: IBrand,
    schema: {
      $ref: getSchemaPath(IBrand),
    },
  })
  @ApiBadRequestResponse({
    type: GenericHttpBadRequestResponse,
  })
  @HttpCode(200)
  async updateBrand(@Body() updateBrandDto: UpdateBrandDTO): Promise<IBrand> {
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
