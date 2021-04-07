import {Ingredient} from './ingredient';

export interface Dish {
  _id: string;
  description: string;
  gi: number;
  ingredients: Record<string, Ingredient>;
  name: string;
  updatedAt: number;
}
