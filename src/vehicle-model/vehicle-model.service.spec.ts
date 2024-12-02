import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { VehicleModelService } from './vehicle-model.service';
import { PrismaService } from '../database/prisma/prisma.service';
import {
  CreateVehicleModelDto,
  UpdateVehicleModelDto,
} from './dtos/vehicle-model.dto';
import { randomUUID } from 'crypto';

describe('VehicleModelService', () => {
  let service: VehicleModelService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleModelService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn((cb) =>
              cb({
                ...prismaService,
              }),
            ),
            brand: {
              findUnique: jest.fn(),
            },
            vehicleModel: {
              create: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<VehicleModelService>(VehicleModelService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new vehicle model', async () => {
      const createDto: CreateVehicleModelDto = {
        name: 'Model X',
        brandId: 'brand-id',
      };
      const handleId = randomUUID();
      const handleDate = new Date();
      (prismaService.brand.findUnique as jest.Mock).mockResolvedValue({
        id: 'brand-id',
      });
      (prismaService.vehicleModel.create as jest.Mock).mockResolvedValue({
        id: handleId,
        name: createDto.name,
        brand: { id: 'brand-id', name: 'Brand A' },
        createdAt: handleDate,
      });

      await expect(service.create(createDto)).resolves.toEqual({
        brand: {
          id: 'brand-id',
          name: 'Brand A',
        },
        createdAt: handleDate,
        id: handleId,
        name: 'Model X',
      });
    });
    it('should throw an error if brand does not exist', async () => {
      const createDto: CreateVehicleModelDto = {
        name: 'Model X',
        brandId: 'invalid-id',
      };
      jest.spyOn(prismaService.brand, 'findUnique').mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('get', () => {
    it('should return the vehicle model year when found', async () => {
      const mockVehicleModel = {
        id: '123',
        name: 'Test Model Year',
        brand: { id: '10', name: 'Test Brand' },
      };

      (prismaService.vehicleModel.findUnique as jest.Mock).mockResolvedValue(
        mockVehicleModel,
      );

      const result = await service.get('123');
      expect(result).toEqual(mockVehicleModel);
      expect(prismaService.vehicleModel.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
        include: {
          brand: true,
          vehicleModelYears: true,
        },
      });
    });

    it('should throw NotFoundException when the vehicle model year is not found', async () => {
      (prismaService.vehicleModel.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      await expect(service.get('123')).rejects.toThrow(NotFoundException);
      expect(prismaService.vehicleModel.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
        include: {
          brand: true,
          vehicleModelYears: true,
        },
      });
    });
  });
  describe('list', () => {
    it('should return a paginated list of vehicle models', async () => {
      const handleDate = new Date();
      jest.spyOn(prismaService.vehicleModel, 'count').mockResolvedValue(10);
      jest.spyOn(prismaService.vehicleModel, 'findMany').mockResolvedValue([
        {
          id: 'model-id',
          name: 'Model X',
          brand: { id: 'brand-id', name: 'Brand A' },
          vehicleModelYears: [],
          createdAt: handleDate,
          updatedAt: handleDate,
        } as any,
      ]);

      const result = await service.list({ page: 1, limit: 5, sort: 'name' });

      expect(result).toEqual({
        data: [
          {
            id: 'model-id',
            name: 'Model X',
            brand: { id: 'brand-id', name: 'Brand A' },
            vehicleModelYears: [],
            createdAt: handleDate,
            updatedAt: handleDate,
          },
        ],
        meta: {
          totalItems: 10,
          itemCount: 1,
          totalPages: 2,
          currentPage: 1,
        },
      });
    });
  });

  describe('update', () => {
    it('should update one vehicle model', async () => {
      const updateDto: UpdateVehicleModelDto = {
        id: 'vehicle-model-id',
        body: {
          name: 'Updated Name',
          brandId: 'brand-id',
        },
      };

      const updatedVehicleModel = {
        id: 'vehicle-model-id',
        name: 'Updated Name',
        brand: { id: 'brand-id', name: 'Brand Name' },
        vehicleModelYears: [],
        updatedAt: new Date(),
      } as any;

      jest
        .spyOn(prismaService.vehicleModel, 'update')
        .mockResolvedValue(updatedVehicleModel);

      const result = await service.update(updateDto);

      expect(prismaService.vehicleModel.update).toHaveBeenCalledWith({
        where: { id: 'vehicle-model-id' },
        data: {
          name: 'Updated Name',
          brand: {
            connect: {
              id: 'brand-id',
            },
          },
          updatedAt: expect.any(Date),
        },
        include: {
          brand: true,
          vehicleModelYears: true,
        },
      });

      expect(result).toEqual(updatedVehicleModel);
    });
  });

  describe('delete', () => {
    it('should delete multiple vehicle models', async () => {
      const ids = ['model-id-1', 'model-id-2'];
      jest
        .spyOn(prismaService.vehicleModel, 'deleteMany')
        .mockResolvedValue({ count: 2 });

      await service.delete(ids);

      expect(prismaService.vehicleModel.deleteMany).toHaveBeenCalledWith({
        where: {
          id: { in: ids },
        },
      });
    });
  });
});
