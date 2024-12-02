import { ApiProperty } from '@nestjs/swagger';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';
import { IVehicleModel } from '../interfaces/vehicle-model.interface';
import {
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { isKeyOfInterface } from 'src/utils/handleFunctions';

export class CreateVehicleModelDto {
  @ApiProperty({
    required: true,
  })
  name: string;
  @ApiProperty({
    required: true,
  })
  brandId: string;
}

export class GetVehicleModelDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}
export class ListVehicleModelDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  brandId: string;

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
    if (value && !isKeyOfInterface(handle, IVehicleModel)) {
      return 'name';
    }
    return value;
  })
  sort: string = 'name';
}
export class ReturnListVehicleModelDto {
  @ApiProperty({
    isArray: true,
    type: () => IVehicleModel,
  })
  data: IVehicleModel[];
  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}

class BodyUpdateVehicleModelDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  brandId: string;
}
export class UpdateVehicleModelDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: BodyUpdateVehicleModelDto,
  })
  body: BodyUpdateVehicleModelDto;
}

export class DeleteVehicleModelDTO {
  @ApiProperty({
    required: true,
    isArray: true,
    type: 'string',
  })
  @ArrayNotEmpty()
  ids: string[];
}
