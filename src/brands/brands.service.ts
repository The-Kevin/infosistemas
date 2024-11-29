import { Injectable } from '@nestjs/common';
import IBrand from './interfaces/brand.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ReturnCreateBrandDTO } from './dtos/brand.dto';
import IGenericOptions from 'src/utils/interfaces/genericOptions.interface';

@Injectable()
export class BrandsService {
  constructor(private prismaService: PrismaService) {}

  async listBrands({ limit, page, sort }: IGenericOptions) {
    const isDescending = sort.startsWith('-');
    const field = sort.replace('-', '');
    const totalItems = await this.prismaService.brand.count();

    const data = await this.prismaService.brand.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [field]: isDescending ? 'desc' : 'asc',
      },
    });

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }
  async create(brand: IBrand): Promise<ReturnCreateBrandDTO> {
    return await this.prismaService.brand.create({
      data: {
        name: brand.name,
      },
    });
  }
}
