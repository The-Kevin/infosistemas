import { ApiProperty } from '@nestjs/swagger';

export class IBrand {
  @ApiProperty()
  name: string;
}
