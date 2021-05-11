import React, {FC, useMemo, useReducer} from 'react';

import FoodContext from './foodContext';
import foodReducer from './foodReducer';
import INITIAL_FOOD_STATE from './initialFoodState';

const FoodProvider: FC = ({children}) => {
  const [foodState, dispatchFoodState] = useReducer(
    foodReducer,
    INITIAL_FOOD_STATE,
  );

  const contextValue = useMemo(() => {
    return {foodState, dispatchFoodState};
  }, [foodState, dispatchFoodState]);

  return (
    <FoodContext.Provider value={contextValue}>{children}</FoodContext.Provider>
  );
};

export default FoodProvider;
