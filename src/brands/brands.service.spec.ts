import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('BrandsService', () => {
  let service: BrandsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: PrismaService,
          useValue: {
            brand: {
              findMany: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return a paginated list of brands', async () => {
      const mockData = [
        { id: '1', name: 'Brand A' },
        { id: '2', name: 'Brand B' },
      ];
      (prismaService.brand.findMany as jest.Mock).mockResolvedValue(mockData);
      (prismaService.brand.count as jest.Mock).mockResolvedValue(2);

      const result = await service.list({ limit: 10, page: 1, sort: 'name' });
      expect(result.data).toEqual(mockData);
      expect(result.meta.totalItems).toBe(2);
      expect(prismaService.brand.findMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new brand', async () => {
      const mockBrand = { id: '1', name: 'Brand A' };
      (prismaService.brand.create as jest.Mock).mockResolvedValue(mockBrand);

      const result = await service.create({ name: 'Brand A' });
      expect(result).toEqual(mockBrand);
      expect(prismaService.brand.create).toHaveBeenCalledWith({
        data: {
          name: 'Brand A',
        },
        include: {
          vehicleModels: {
            include: {
              vehicleModelYears: true,
            },
          },
        },
      });
    });
  });

  describe('update', () => {
    it('should update an existing brand', async () => {
      const mockBrand = { id: '1', name: 'Updated Brand' };
      (prismaService.brand.findUnique as jest.Mock).mockResolvedValue(
        mockBrand,
      );
      (prismaService.brand.update as jest.Mock).mockResolvedValue(mockBrand);

      const result = await service.update({
        id: '1',
        body: { name: 'Updated Brand' },
      });
      expect(result).toEqual(mockBrand);
      expect(prismaService.brand.update).toHaveBeenCalled();
    });
    it('should ignore internal fields in update process', async () => {
      const mockBrand = { id: '1', createdAt: new Date() };
      (prismaService.brand.findUnique as jest.Mock).mockResolvedValue(
        mockBrand,
      );
      (prismaService.brand.update as jest.Mock).mockResolvedValue(mockBrand);

      const result = await service.update({
        id: '1',
        body: { createdAt: new Date('6/6/1666') } as any, //hacked
      });
      expect(result).toEqual(mockBrand);
      expect(prismaService.brand.update).not.toHaveBeenCalledWith({
        createdAt: new Date('6/6/1666'),
      });
    });

    it('should throw an exception if brand does not exist', async () => {
      (prismaService.brand.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.update({
          id: '1',
          body: { name: 'Updated Brand' },
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete brands by IDs', async () => {
      (prismaService.brand.deleteMany as jest.Mock).mockResolvedValue({
        count: 1,
      });

      await service.delete(['1']);
      expect(prismaService.brand.deleteMany).toHaveBeenCalledWith({
        where: { id: { in: ['1'] } },
      });
    });
  });
});
