import { ApiProperty } from '@nestjs/swagger';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IVehicleModel } from 'src/vehicle-model/interfaces/vehicle-model.interface';

export class IBrand extends IGenericModel {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: () => IVehicleModel,
    isArray: true,
    required: false,
  })
  vehicleModels?: IVehicleModel[];
}
