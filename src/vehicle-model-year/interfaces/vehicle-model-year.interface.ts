import { ApiProperty } from '@nestjs/swagger';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IVehicleModel } from 'src/vehicle-model/interfaces/vehicle-model.interface';

export class IVehicleModelYear extends IGenericModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  plate: string;
  @ApiProperty()
  renavam: string;
  @ApiProperty({
    type: () => IVehicleModel,
  })
  model?: Exclude<IVehicleModel, { vehicleModelYears: IVehicleModelYear[] }>;
}
