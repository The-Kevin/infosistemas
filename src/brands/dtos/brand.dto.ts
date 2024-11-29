import IGenericModel from 'src/utils/interfaces/genericModel.interface';
import { IBrand } from '../interfaces/brand.interface';

export class CreateBrandDTO {
  name: string;
}

export interface ReturnCreateBrandDTO extends IGenericModel {
  name: string;
}

export class UpdateBrandDTO {
  id: string;
  data: Partial<IBrand>;
}

export class DeleteBrandDTO {
  ids: string[];
}
