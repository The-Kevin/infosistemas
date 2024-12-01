import { ApiProperty } from '@nestjs/swagger';
import { IBrand } from 'src/brands/interfaces/brand.interface';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IVehicleModel } from '../interfaces/vehicle-model.interface';
import ExcludeGenericProps from 'src/utils/interfaces/excludeProps.interface';
import { IVehicleModelYear } from 'src/vehicle-model-year/interfaces/vehicle-model-year.interface';
import { ArrayNotEmpty } from 'class-validator';

export class CreateVehicleModelDto {
  @ApiProperty({
    required: true,
  })
  name: string;
  @ApiProperty({
    required: true,
  })
  brandId: string;
}

export class ReturnListVehicleModelDto {
  @ApiProperty({
    isArray: true,
    type: () => IVehicleModel,
  })
  data: IVehicleModel[];
  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}

export class UpdateVehicleModelDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: IVehicleModel,
  })
  body: ExcludeGenericProps<
    Partial<IVehicleModel>,
    IGenericModel & {
      brand: IBrand;
      vehicleModelYears: Exclude<IVehicleModelYear, { model: IVehicleModel }>[];
    }
  > & { brandId?: string };
}

export class DeleteVehicleModelDTO {
  @ApiProperty({
    required: true,
    isArray: true,
    type: 'string',
  })
  @ArrayNotEmpty()
  ids: string[];
}
