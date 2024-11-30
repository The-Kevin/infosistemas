import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IBrand } from '../interfaces/brand.interface';
import { ArrayNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

class ReturnListMetaBrandsDTO {
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  itemCount: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  currentPage: number;
}
export class ReturnListBrandsDTO {
  @ApiProperty({ type: ReturnListDataBrandsDTO })
  data: ReturnListDataBrandsDTO[];

  @ApiProperty({ type: ReturnListMetaBrandsDTO })
  meta: ReturnListMetaBrandsDTO;
}
export class UpdateBrandDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ type: IBrand, required: false })
  data: Partial<IBrand>;
}

export class DeleteBrandDTO {
  @ApiProperty()
  @ArrayNotEmpty()
  ids: string[];
}
