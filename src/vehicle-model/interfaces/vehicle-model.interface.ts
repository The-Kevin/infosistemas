import { ApiProperty } from '@nestjs/swagger';
import { IBrand } from 'src/brands/interfaces/brand.interface';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IVehicleModelYear } from 'src/vehicle-model-year/interfaces/vehicle-model-year.interface';

export class IVehicleModel extends IGenericModel {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: IBrand })
  brand: IBrand;

  vehicleModelYears: Exclude<IVehicleModelYear, { model: IVehicleModel }>[];
}
