import {EnergyValue} from './energyValue';

export interface Product extends EnergyValue {
  _id: string;
  description: string;
  gi: string;
  name: string;
  updatedAt: number;
  weight?: string;
}
