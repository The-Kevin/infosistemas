import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import {
  CreateVehicleModelDto,
  ReturnListVehicleModelDto,
  UpdateVehicleModelDto,
} from './dtos/vehicle-model.dto';
import IGenericOptions from '../utils/interfaces/genericOptions.interface';
import { IVehicleModel } from './interfaces/vehicle-model.interface';

@Injectable()
export class VehicleModelService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateVehicleModelDto): Promise<IVehicleModel> {
    return await this.prismaService.$transaction(async (tx) => {
      const brand = await this.prismaService.brand.findUnique({
        where: { id: data.brandId },
      });

      if (!brand) throw new BadRequestException('Brand not exist');

      return tx.vehicleModel.create({
        data: {
          name: data.name,
          brand: { connect: { id: brand.id } },
        },
        include: {
          brand: true,
          vehicleModelYears: false,
        },
      });
    });
  }
  async list({
    limit,
    page,
    sort,
  }: IGenericOptions): Promise<ReturnListVehicleModelDto> {
    const isDescending = sort.startsWith('-');
    const field = sort.replace('-', '');
    const totalItems = await this.prismaService.vehicleModel.count();

    const data = await this.prismaService.vehicleModel.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [field]: isDescending ? 'desc' : 'asc',
      },
      include: {
        brand: true,
        vehicleModelYears: true,
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

  async update(data: UpdateVehicleModelDto): Promise<IVehicleModel> {
    return await this.prismaService.vehicleModel.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.body?.name,
        ...(data.body?.brandId && {
          brand: {
            connect: {
              id: data.body.brandId,
            },
          },
        }),
        updatedAt: new Date(),
      },
      include: {
        brand: true,
        vehicleModelYears: true,
      },
    });
  }

  async delete(ids: string[]): Promise<void> {
    await this.prismaService.vehicleModel.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
