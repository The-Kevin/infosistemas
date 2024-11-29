import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IBrand } from '../interfaces/brand.interface';
import { ArrayNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBrandDTO {
  @MaxLength(255)
  name: string;
}

export interface ReturnCreateBrandDTO extends IGenericModel {
  name: string;
}

export class UpdateBrandDTO {
  @IsUUID()
  id: string;
  @Type(() => IBrand)
  data: Partial<IBrand>;
}

export class DeleteBrandDTO {
  @ArrayNotEmpty()
  ids: string[];
}
