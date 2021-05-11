import {Ingredient} from './ingredient';
import {EnergyValue} from './energyValue';

export interface Dish extends EnergyValue {
  _id: string;
  description: string;
  gi: string;
  ingredients: Record<string, Ingredient>;
  name: string;
  updatedAt: number;
}
