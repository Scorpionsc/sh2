import {Product} from '../shared/interfaces/product';
import {Dish} from '../shared/interfaces/dish';

export interface FoodState {
  title: string;
  product: Product | null;
  isProductSaving: boolean;
  dish: Dish | null;
  isDishSaving: boolean;
}
