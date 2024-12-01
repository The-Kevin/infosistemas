import {
  BadRequestException,
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
import { isKeyOfInterface } from 'src/utils/handleFunctions';
import { IBrand } from './interfaces/brand.interface';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';

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
  @HttpCode(200)
  async listBrands(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'name',
  ) {
    limit = Math.min(limit, 100);
    const handleSort = sort.replace('-', '');

    if (
      !isKeyOfInterface(handleSort, IBrand) ||
      (typeof page || typeof limit) != 'number'
    ) {
      return new BadRequestException('Invalid params');
    }
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
  @HttpCode(204)
  async updateBrand(
    @Body() updateBrandDto: UpdateBrandDTO,
  ): Promise<ReturnUpdateBrandDTO> {
    return await this.brandService.update(updateBrandDto);
  }

  @Delete()
  @ApiOkResponse({
    description: 'Delete brands',
    type: 'string',
  })
  @HttpCode(200)
  async deleteBrand(@Body() data: DeleteBrandDTO): Promise<string> {
    await this.brandService.delete(data.ids);
    return 'ok';
  }
}
