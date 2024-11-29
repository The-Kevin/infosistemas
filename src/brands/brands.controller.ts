import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBrandDTO, ReturnCreateBrandDTO } from './dtos/brand.dto';
import { BrandsService } from './brands.service';
import { isKeyOfInterface } from 'src/utils/handleFunctions';
import IBrand from './interfaces/brand.interface';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
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
    return await this.brandService.listBrands({
      page,
      limit,
      sort,
    });
  }
  @Post()
  async createBrand(
    @Body() createBrandDto: CreateBrandDTO,
  ): Promise<ReturnCreateBrandDTO> {
    return await this.brandService.create(createBrandDto);
  }
}
