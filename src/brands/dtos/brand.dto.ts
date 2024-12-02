import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IBrand } from '../interfaces/brand.interface';
import {
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';
import { Transform, Type } from 'class-transformer';
import { isKeyOfInterface } from 'src/utils/handleFunctions';
export class HandleIBrand extends IGenericModel {
  @ApiProperty()
  name: string;
}

export class CreateBrandDTO {
  @ApiProperty({
    required: true,
  })
  @MaxLength(255)
  name: string;
}

export class GetBrandDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}

export class ListBrandDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page: number = 1;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 10;

  @ApiProperty({ example: 'name', required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    const handle = value.replace('-', '');
    if (value && !isKeyOfInterface(handle, IBrand)) {
      return 'name';
    }
    return value;
  })
  sort: string = 'name';
}
export class ReturnListBrandsDTO {
  @ApiProperty({ type: IBrand })
  data: IBrand[];

  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}

export class BodyUpdateBrandDTO {
  @ApiProperty({
    required: true,
  })
  @MaxLength(255)
  name: string;
}

export class UpdateBrandDTO {
  @ApiProperty({
    required: true,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    required: false,
    type: () => BodyUpdateBrandDTO,
  })
  @ValidateNested()
  @Type(() => BodyUpdateBrandDTO)
  body?: BodyUpdateBrandDTO;
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
