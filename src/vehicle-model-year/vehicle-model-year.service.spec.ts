import { Test, TestingModule } from '@nestjs/testing';
import { VehicleModelYearService } from './vehicle-model-year.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('VehicleModelYearService', () => {
  let service: VehicleModelYearService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleModelYearService,
        {
          provide: PrismaService,
          useValue: {
            vehicleModel: {
              findUnique: jest.fn(),
            },
            vehicleModelYear: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<VehicleModelYearService>(VehicleModelYearService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new vehicle model year', async () => {
      const createDto = {
        name: 'Model Year Name',
        year: 2024,
        modelId: 'model-id',
        plate: 'ABC1234',
        renavam: '12345678901',
      };
      const mockVehicleModel = { id: 'model-id', name: 'Model Name' } as any;
      const mockCreated = {
        id: 'created-id',
        ...createDto,
        model: mockVehicleModel,
      } as any;

      jest
        .spyOn(prismaService.vehicleModel, 'findUnique')
        .mockResolvedValue(mockVehicleModel);
      jest
        .spyOn(prismaService.vehicleModelYear, 'create')
        .mockResolvedValue(mockCreated);

      const result = await service.create(createDto);

      expect(prismaService.vehicleModel.findUnique).toHaveBeenCalledWith({
        where: { id: 'model-id' },
      });
      expect(prismaService.vehicleModelYear.create).toHaveBeenCalledWith({
        data: {
          name: createDto.name,
          year: createDto.year,
          plate: createDto.plate,
          renavam: createDto.renavam,
          model: {
            connect: { id: createDto.modelId },
          },
        },
        include: {
          model: {
            include: {
              vehicleModelYears: false,
              brand: true,
            },
          },
        },
      });
      expect(result).toEqual(mockCreated);
    });

    it('should throw an error if the vehicle model does not exist', async () => {
      const createDto = {
        name: 'Model Year Name',
        year: 2024,
        modelId: 'nonexistent-model-id',
        plate: 'ABC1234',
        renavam: '12345678901',
      };

      jest
        .spyOn(prismaService.vehicleModel, 'findUnique')
        .mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(
        new BadRequestException('Vehicle model is not exist'),
      );
    });
  });

  describe('list', () => {
    it('should return paginated list of vehicle model years', async () => {
      const mockList = [
        { id: '1', name: 'Year 1', model: { name: 'Model 1' } },
        { id: '2', name: 'Year 2', model: { name: 'Model 2' } },
      ] as any;
      const options = { limit: 2, page: 1, sort: 'name' };
      const totalItems = 10;

      jest
        .spyOn(prismaService.vehicleModelYear, 'findMany')
        .mockResolvedValue(mockList);
      jest
        .spyOn(prismaService.vehicleModelYear, 'count')
        .mockResolvedValue(totalItems);

      const result = await service.list(options);

      expect(prismaService.vehicleModelYear.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 2,
        orderBy: { name: 'asc' },
        include: { model: { include: { brand: true } } },
      });
      expect(result).toEqual({
        data: mockList,
        meta: {
          totalItems,
          itemCount: mockList.length,
          totalPages: Math.ceil(totalItems / options.limit),
          currentPage: options.page,
        },
      });
    });
  });

  describe('update', () => {
    it('should update an existing vehicle model year', async () => {
      const updateDto = {
        id: 'year-id',
        body: {
          name: 'Updated Year Name',
          modelId: 'new-model-id',
          plate: 'DEF5678',
          renavam: '98765432109',
          year: 2025,
        },
      };
      const mockUpdated = {
        id: 'year-id',
        ...updateDto.body,
        model: { id: 'new-model-id', name: 'New Model Name' },
      };

      jest
        .spyOn(prismaService.vehicleModel, 'findUnique')
        .mockResolvedValue({ id: 'new-model-id' } as any);
      jest
        .spyOn(prismaService.vehicleModelYear, 'update')
        .mockResolvedValue(mockUpdated as any);

      const result = await service.update(updateDto);

      expect(prismaService.vehicleModel.findUnique).toHaveBeenCalledWith({
        where: { id: 'new-model-id' },
      });
      expect(prismaService.vehicleModelYear.update).toHaveBeenCalledWith({
        where: { id: updateDto.id },
        data: {
          name: updateDto.body.name,
          year: updateDto.body.year,
          plate: updateDto.body.plate,
          renavam: updateDto.body.renavam,
          model: { connect: { id: updateDto.body.modelId } },
          updatedAt: expect.any(Date),
        },
        include: { model: { include: { brand: true } } },
      });
      expect(result).toEqual(mockUpdated);
    });
  });

  describe('delete', () => {
    it('should delete multiple vehicle model years', async () => {
      const ids = ['id1', 'id2'];

      jest
        .spyOn(prismaService.vehicleModelYear, 'deleteMany')
        .mockResolvedValue({ count: 2 });

      await service.delete(ids);

      expect(prismaService.vehicleModelYear.deleteMany).toHaveBeenCalledWith({
        where: { id: { in: ids } },
      });
    });
  });
});
