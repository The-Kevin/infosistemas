import { ApiProperty } from '@nestjs/swagger';
import { IBrand } from 'src/brands/interfaces/brand.interface';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';

export class IVehicleModel extends IGenericModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  brand: IBrand;
}
