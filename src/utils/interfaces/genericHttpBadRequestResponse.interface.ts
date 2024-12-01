import { ApiProperty } from '@nestjs/swagger';

export default class GenericHttpBadRequestResponse {
  @ApiProperty({
    isArray: true,
    type: 'string',
  })
  message: string[];
  @ApiProperty()
  error: string;
  @ApiProperty({
    type: 'number',
  })
  statusCode: number;
}
