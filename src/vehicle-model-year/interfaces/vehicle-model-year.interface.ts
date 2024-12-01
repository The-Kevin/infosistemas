import { ApiProperty } from '@nestjs/swagger';

import IGenericModel from 'src/utils/interfaces/genericModel.interface';

export class IVehicleModelYear extends IGenericModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  plate: string;
  @ApiProperty()
  renavam: string;
}
