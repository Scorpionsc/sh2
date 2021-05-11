import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';

import FoodContext from '../../../store/foodContext';
import {setDish, setFoodTitle} from '../../../store/foodActions';
import {Alert} from 'react-native';
import {Dish} from '../../../shared/interfaces/dish';
import useDeleteDish from '../../../api/sugarCollector/hooks/useDeleteDish';

interface UseDishesProps {
  onDishDeleted: () => void;
  onDishFocus: () => void;
}

interface UseDishesRes {
  dishClickHandler: (item: Dish) => void;
  addDishHandler: () => void;
  deleteDishHandler: (dish: Dish) => void;
  isDeleting: boolean;
}

const useDishes: (props: UseDishesProps) => UseDishesRes = ({
  onDishDeleted,
  onDishFocus,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {navigate} = useNavigation();
  const {dispatchFoodState} = useContext(FoodContext);
  const {deleteDish} = useDeleteDish();
  const {addListener} = useNavigation();

  useEffect(() => {
    return addListener('focus', () => onDishFocus());
  }, [addListener, onDishFocus]);

  const dishClickHandler = (item: Dish) => {
    dispatchFoodState(setFoodTitle({value: item.name}));
    dispatchFoodState(setDish({value: item}));
    navigate('Dishes', {
      screen: 'DishStack',
      params: {screen: 'DishScreen'},
    });
  };

  const addDishHandler = () => {
    dispatchFoodState(setDish({value: null}));
    navigate('Dishes', {
      screen: 'DishStack',
      params: {screen: 'DishConstructorScreen'},
    });
  };

  const removeDish = async (dishId: string) => {
    setIsDeleting(true);
    await deleteDish(dishId);
    setIsDeleting(false);

    onDishDeleted();
  };

  const deleteDishHandler = (dish: Dish) => {
    Alert.alert(`Delete dish ${dish.name}`, 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removeDish(dish._id).then();
        },
      },
    ]);
  };

  return {
    dishClickHandler,
    addDishHandler,
    deleteDishHandler,
    isDeleting,
  };
};

export default useDishes;
