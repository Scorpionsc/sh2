import FoodType from '../enums/foodType';

export interface KitchenProduct {
  id: string;
  description: string;
  fats: number;
  proteins: number;
  carbohydrates: number;
  name: string;
  weight?: number;
  type: FoodType;
}
