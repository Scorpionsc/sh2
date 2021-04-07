import { EnergyValue } from './energyValue';

export interface Product extends EnergyValue {
  _id: string;
  description: string;
  gi: number;
  name: string;
  updatedAt: number;
}
