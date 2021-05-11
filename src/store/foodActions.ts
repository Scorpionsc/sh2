import ActionPayload from '../shared/interfaces/actionPayload';
import actionFn from '../shared/utils/actionFn';
import {Product} from '../shared/interfaces/product';
import {Dish} from '../shared/interfaces/dish';

export enum FoodActionTypes {
  SetTitle,
  SetProduct,
  SetIsProductSaving,
  SetDish,
  SetIsDishSaving,
}

export interface SetFoodTitleAction {
  type: FoodActionTypes.SetTitle;
  payload: ActionPayload<string>;
}

export const setFoodTitle = actionFn<SetFoodTitleAction>(
  FoodActionTypes.SetTitle,
);

export interface SetProductSavingAction {
  type: FoodActionTypes.SetIsProductSaving;
  payload: ActionPayload<boolean>;
}

export const setIsProductSaving = actionFn<SetProductSavingAction>(
  FoodActionTypes.SetIsProductSaving,
);

export interface SetProductAction {
  type: FoodActionTypes.SetProduct;
  payload: ActionPayload<Product | null>;
}

export const setProduct = actionFn<SetProductAction>(
  FoodActionTypes.SetProduct,
);

export interface SetDishSavingAction {
  type: FoodActionTypes.SetIsDishSaving;
  payload: ActionPayload<boolean>;
}

export const setIsDishSaving = actionFn<SetDishSavingAction>(
  FoodActionTypes.SetIsDishSaving,
);

export interface SetDishAction {
  type: FoodActionTypes.SetDish;
  payload: ActionPayload<Dish | null>;
}

export const setDish = actionFn<SetDishAction>(FoodActionTypes.SetDish);

export type FoodAction =
  | SetFoodTitleAction
  | SetProductAction
  | SetProductSavingAction
  | SetDishAction
  | SetDishSavingAction;
