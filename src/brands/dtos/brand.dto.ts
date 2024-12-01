import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IBrand } from '../interfaces/brand.interface';
import { ArrayNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';

export class CreateBrandDTO {
  @ApiProperty()
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

class ReturnListDataBrandsDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date | null;
}

export class ReturnListBrandsDTO {
  @ApiProperty({ type: ReturnListDataBrandsDTO })
  data: ReturnListDataBrandsDTO[];

  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}
export class UpdateBrandDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ type: IBrand, required: false })
  body: Partial<IBrand>;
}

export class DeleteBrandDTO {
  @ApiProperty()
  @ArrayNotEmpty()
  ids: string[];
}
