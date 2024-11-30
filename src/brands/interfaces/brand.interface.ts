import { ApiProperty } from '@nestjs/swagger';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';

export class IBrand extends IGenericModel {
  @ApiProperty()
  name: string;
}

export class IUpdateBrand {
  @ApiProperty()
  name?: string;
}
