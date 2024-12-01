import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateVehicleModelYearDto,
  ReturnListVehicleModelYearDto,
  UpdateVehicleModelYearDto,
} from './dtos/vehicle-model-year.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { IVehicleModelYear } from './interfaces/vehicle-model-year.interface';
import IGenericOptions from 'src/utils/interfaces/genericOptions.interface';

@Injectable()
export class VehicleModelYearService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateVehicleModelYearDto): Promise<IVehicleModelYear> {
    const vehicleModel = await this.prismaService.vehicleModel.findUnique({
      where: {
        id: data.modelId,
      },
    });
    if (!vehicleModel)
      throw new BadRequestException('Vehicle model is not exist');

    return await this.prismaService.vehicleModelYear.create({
      data: {
        name: data.name,
        plate: data.plate,
        renavam: data.renavam,
        year: data.year,
        model: {
          connect: {
            id: vehicleModel.id,
          },
        },
      },
      include: {
        model: {
          include: {
            brand: true,
          },
        },
      },
    });
  }
  async list({
    limit,
    page,
    sort,
  }: IGenericOptions): Promise<ReturnListVehicleModelYearDto> {
    const isDescending = sort.startsWith('-');
    const field = sort.replace('-', '');
    const totalItems = await this.prismaService.vehicleModelYear.count();

    const data = await this.prismaService.vehicleModelYear.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [field]: isDescending ? 'desc' : 'asc',
      },
      include: {
        model: {
          include: {
            brand: true,
          },
        },
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
  async update(data: UpdateVehicleModelYearDto): Promise<IVehicleModelYear> {
    if (data.body.modelId) {
      const exists = await this.prismaService.vehicleModel.findUnique({
        where: { id: data.body.modelId },
      });
      if (!exists) throw new BadRequestException('Invalid vehicle model');
    }

    const { modelId, ...updateData } = data.body;

    return this.prismaService.vehicleModelYear.update({
      where: { id: data.id },
      data: {
        ...updateData,
        ...(modelId && {
          model: { connect: { id: modelId } },
        }),
      },
      include: {
        model: { include: { brand: true } },
      },
    });
  }
  async delete(ids: string[]): Promise<void> {
    await this.prismaService.vehicleModelYear.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
