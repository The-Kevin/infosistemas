import { ApiProperty } from '@nestjs/swagger';
import { IVehicleModelYear } from '../interfaces/vehicle-model-year.interface';
import GenericListMetadata from 'src/utils/interfaces/genericListMetadata.interface';
import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import ExcludeGenericProps from 'src/utils/interfaces/excludeProps.interface';
import { IVehicleModel } from 'src/vehicle-model/interfaces/vehicle-model.interface';
import { ArrayNotEmpty, MaxLength, MinLength } from 'class-validator';

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
