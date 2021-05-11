import {createContext} from 'react';

import * as FoodTitleActions from './foodActions';
import {FoodState} from './foodState';
import noop from '../shared/utils/noop';
import INITIAL_FOOD_STATE from './initialFoodState';

interface FoodTitleContextType {
  foodState: FoodState;
  dispatchFoodState: (action: FoodTitleActions.FoodAction) => void;
}

const FoodContext = createContext<FoodTitleContextType>({
  foodState: INITIAL_FOOD_STATE,
  dispatchFoodState: noop,
});

export default FoodContext;
