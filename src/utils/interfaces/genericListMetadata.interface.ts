import { ApiProperty } from '@nestjs/swagger';

export default class GenericListMetadata {
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  itemCount: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  currentPage: number;
}
