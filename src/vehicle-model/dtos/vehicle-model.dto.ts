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
export class ReturnCreateVehicleModelDto extends IGenericModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  brand: IBrand;
}

class HandleIBrand extends IGenericModel {
  // copy of IBrand
  @ApiProperty()
  name: string;
}
class HandleIVehicleModelYear extends IGenericModel {
  // copy of IVehicleModelYear
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  plate: string;
  @ApiProperty()
  renavam: string;
}

class ReturnListVehicleModelDataDto extends IGenericModel {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: HandleIBrand })
  brand: IBrand & IGenericModel;
  @ApiProperty({ type: HandleIVehicleModelYear, isArray: true })
  vehicleModelYears: (IVehicleModelYear & IGenericModel)[];
}
export class ReturnListVehicleModelDto {
  @ApiProperty({
    isArray: true,
    type: ReturnListVehicleModelDataDto,
  })
  data: ReturnListVehicleModelDataDto[];
  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}

class UpdateVehicleModelBodyDto {
  @ApiProperty({
    required: false,
  })
  name: string;
  @ApiProperty({
    required: false,
  })
  brandId: string;
}
export class UpdateVehicleModelDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: UpdateVehicleModelBodyDto,
  })
  body: ExcludeGenericProps<
    Partial<IVehicleModel>,
    IGenericModel & {
      brand: IBrand;
      vehicleModelYears: Exclude<IVehicleModelYear, { model: IVehicleModel }>[];
    }
  > & { brandId?: string };
}

export class ReturnUpdateVehicleModelDto extends IGenericModel {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: HandleIBrand })
  brand: IBrand & IGenericModel;
  @ApiProperty({ type: HandleIVehicleModelYear, isArray: true })
  vehicleModelYears: (IVehicleModelYear & IGenericModel)[];
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
