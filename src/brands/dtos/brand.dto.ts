import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IBrand } from '../interfaces/brand.interface';
import { ArrayNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';

export class CreateBrandDTO {
  @ApiProperty({
    required: true,
  })
  @MaxLength(255)
  name: string;
}

export class ReturnCreateBrandDTO extends IGenericModel {
  @ApiProperty()
  name: string;
}

export class ReturnUpdateBrandDTO extends IGenericModel {
  @ApiProperty()
  name: string;
}

class ReturnListDataBrandsDTO extends IGenericModel {
  @ApiProperty()
  name: string;
}

export class ReturnListBrandsDTO {
  @ApiProperty({ type: ReturnListDataBrandsDTO })
  data: ReturnListDataBrandsDTO[];

  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}
export class UpdateBrandDTO {
  @ApiProperty({
    required: true,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    required: false,
    type: IBrand,
  })
  body: Partial<IBrand>;
}

export class DeleteBrandDTO {
  @ApiProperty({
    required: true,
    isArray: true,
    type: 'string',
  })
  @ArrayNotEmpty()
  ids: string[];
}
