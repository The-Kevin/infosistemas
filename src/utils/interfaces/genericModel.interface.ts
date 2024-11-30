import { ApiProperty } from '@nestjs/swagger';

export default class IGenericModel {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date | null;
}
