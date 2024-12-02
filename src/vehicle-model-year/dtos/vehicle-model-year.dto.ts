import { ApiProperty } from '@nestjs/swagger';
import { IVehicleModelYear } from '../interfaces/vehicle-model-year.interface';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';
import {
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { isKeyOfInterface } from 'src/utils/handleFunctions';

export class CreateVehicleModelYearDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  modelId: string;
  @ApiProperty()
  @MinLength(6)
  @MaxLength(8) //  Resolution 780 CONTRAN https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao7802019.pdf
  plate: string;
  @ApiProperty()
  @MinLength(11)
  @MaxLength(11)
  renavam: string;
}
export class GetVehicleModelYearDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}
export class ListVehicleModelYearDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  brandId: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  vehicleModelId: string;

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
    if (value && !isKeyOfInterface(handle, IVehicleModelYear)) {
      return 'name';
    }
    return value;
  })
  sort: string = 'name';
}

export class ReturnListVehicleModelYearDto {
  @ApiProperty({ type: () => IVehicleModelYear, isArray: true })
  data: IVehicleModelYear[];
  @ApiProperty({ type: GenericListMetadata })
  meta: GenericListMetadata;
}

class BodyUpdateVehicleModelYearDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  plate: string;
  @ApiProperty()
  renavam: string;
  @ApiProperty()
  modelId: string;
}
export class UpdateVehicleModelYearDto {
  @ApiProperty()
  @IsUUID()
  id: string;
  @ApiProperty({
    type: BodyUpdateVehicleModelYearDto,
  })
  body: BodyUpdateVehicleModelYearDto;
}
export class DeleteVehicleModelYearsDTO {
  @ApiProperty({
    required: true,
    isArray: true,
    type: 'string',
  })
  @ArrayNotEmpty()
  ids: string[];
}
