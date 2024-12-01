import { ApiProperty } from '@nestjs/swagger';

export class IVehicleModelYear {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  plate: string;
  @ApiProperty()
  renavam: string;
}
