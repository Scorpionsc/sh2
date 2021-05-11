import FoodType from '../../screens/calculator/enums/foodType';

export interface KitchenProduct {
  id: string;
  description: string;
  fats: string;
  proteins: string;
  carbohydrates: string;
  name: string;
  weight?: number;
  type: FoodType;
}
