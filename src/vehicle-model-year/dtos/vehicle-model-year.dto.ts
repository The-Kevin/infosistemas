import { ApiProperty } from '@nestjs/swagger';
import { IVehicleModelYear } from '../interfaces/vehicle-model-year.interface';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import ExcludeGenericProps from 'src/utils/interfaces/excludeProps.interface';
import { IVehicleModel } from 'src/vehicle-model/interfaces/vehicle-model.interface';
import {
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
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
export class ListVehicleModelYearDto {
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

export class UpdateVehicleModelYearDto {
  id: string;
  body: Partial<
    ExcludeGenericProps<
      IVehicleModelYear,
      IGenericModel & { model: IVehicleModel }
    > & {
      modelId: string;
    }
  >;
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
