import { BadRequestException, Injectable } from '@nestjs/common';
import { IUpdateBrand } from './interfaces/brand.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import {
  CreateBrandDTO,
  ReturnCreateBrandDTO,
  ReturnUpdateBrandDTO,
} from './dtos/brand.dto';
import IGenericOptions from 'src/utils/interfaces/genericOptions.interface';

@Injectable()
export class BrandsService {
  constructor(private prismaService: PrismaService) {}

  async list({ limit, page, sort }: IGenericOptions) {
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
  async create(brand: CreateBrandDTO): Promise<ReturnCreateBrandDTO> {
    return await this.prismaService.brand.create({
      data: {
        name: brand.name,
      },
    });
  }

  async update(id: string, data: IUpdateBrand): Promise<ReturnUpdateBrandDTO> {
    const exists = await this.prismaService.brand.findUnique({
      where: {
        id,
      },
    });

    if (!exists) throw new BadRequestException('Brand not exist');
    return await this.prismaService.brand.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async delete(ids: string[]): Promise<void> {
    await this.prismaService.brand.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
