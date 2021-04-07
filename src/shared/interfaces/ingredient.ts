import FoodType from '../enums/foodType';
import {EnergyValue} from './energyValue';

export interface Ingredient extends EnergyValue {
  id: string;
  title: string;
  type: FoodType;
  weight: number;
}
