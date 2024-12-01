import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import {
  CreateVehicleModelDto,
  ReturnCreateVehicleModelDto,
  ReturnListVehicleModelDto,
} from './dtos/vehicle-model.dto';
import IGenericOptions from 'src/utils/interfaces/genericOptions.interface';
import { IVehicleModel } from './interfaces/vehicle-model.interface';

@Injectable()
export class VehicleModelService {
  constructor(private prismaService: PrismaService) {}
  async create(
    data: CreateVehicleModelDto,
  ): Promise<ReturnCreateVehicleModelDto> {
    return await this.prismaService.$transaction(async (tx) => {
      const brand = await this.prismaService.brand.findUnique({
        where: { id: data.brandId },
      });

      if (!brand) throw new BadRequestException('Brand not exist');
      const theresVehicleModelYearsIds = data.vehicleModelYearIds?.length > 0;
      if (theresVehicleModelYearsIds) {
        const vehicleModelYears = await tx.vehicleModelYear.findMany({
          where: { id: { in: data.vehicleModelYearIds } },
        });

        const foundIds = vehicleModelYears.map((year) => year.id);
        const invalidIds = data.vehicleModelYearIds.filter(
          (id) => !foundIds.includes(id),
        );

        if (invalidIds.length > 0) {
          throw new BadRequestException(
            `Invalid vehicle model year IDs: ${invalidIds.join(', ')}`,
          );
        }
      }
      return tx.vehicleModel.create({
        data: {
          name: data.name,
          brand: { connect: { id: brand.id } },
          ...(theresVehicleModelYearsIds && {
            vehicleModelYears: {
              connect: data.vehicleModelYearIds?.map((id) => ({ id })) || [],
            },
          }),
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

  async update(
    id: string,
    data: { name: string; brandId?: string }, //insert fields according improve model
  ): Promise<IVehicleModel> {
    return await this.prismaService.vehicleModel.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        ...(data.brandId && {
          brand: {
            connect: {
              id: data.brandId,
            },
          },
        }),
        updatedAt: new Date(),
      },
      include: {
        brand: true,
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
