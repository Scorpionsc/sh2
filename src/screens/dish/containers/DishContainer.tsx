import React, {FC, useContext} from 'react';
import FoodContext from '../../../store/foodContext';
import DishItem from '../components/dishItem/DishItem';

const DishContainer: FC = () => {
  const {
    foodState: {dish},
  } = useContext(FoodContext);

  return dish ? <DishItem dish={dish} /> : null;
};

export default DishContainer;
