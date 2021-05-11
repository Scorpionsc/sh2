import * as FoodTitleActions from './foodActions';
import {FoodState} from './foodState';

const foodReducer = (
  state: FoodState,
  action: FoodTitleActions.FoodAction,
): FoodState => {
  const actionTypes = FoodTitleActions.FoodActionTypes;

  switch (action.type) {
    case actionTypes.SetTitle:
      return {
        ...state,
        title: action.payload.value,
      };
    case actionTypes.SetProduct:
      return {
        ...state,
        product: action.payload.value,
      };
    case actionTypes.SetIsProductSaving:
      return {
        ...state,
        isProductSaving: action.payload.value,
      };
    case actionTypes.SetDish:
      return {
        ...state,
        dish: action.payload.value,
      };
    case actionTypes.SetIsDishSaving:
      return {
        ...state,
        isDishSaving: action.payload.value,
      };
    default:
      return state;
  }
};

export default foodReducer;
