import { ApiProperty } from '@nestjs/swagger';

export class IBrand {
  @ApiProperty()
  name: string;
}

export class IUpdateBrand {
  @ApiProperty()
  name?: string;
}
