import IGenericModel from 'src/utils/interfaces/genericModel.interface';

export class CreateBrandDTO {
  name: string;
}

export interface ReturnCreateBrandDTO extends IGenericModel {
  name: string;
}
