import { ApiProperty } from '@nestjs/swagger';
import { IBrand } from 'src/brands/interfaces/brand.interface';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IVehicleModel } from '../interfaces/vehicle-model.interface';
import ExcludeGenericProps from 'src/utils/interfaces/excludeProps.interface';

export class CreateVehicleModelDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  brandId: string;
  @ApiProperty({
    isArray: true,
  })
  vehicleModelYearIds?: string[];
}
export class ReturnCreateVehicleModelDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  brand: IBrand;
}
export class ReturnListVehicleModelDto {
  @ApiProperty()
  data: IVehicleModel[];
  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}

export class UpdateVehicleModelDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  body: ExcludeGenericProps<
    Partial<IVehicleModel>,
    IGenericModel & { brand: IBrand }
  > & { brandId: string };
}
