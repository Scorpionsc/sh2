import {useContext, useEffect, useState} from 'react';
import FoodContext from '../../../store/foodContext';
import {
  setIsDishSaving,
  setDish as setStateDish,
} from '../../../store/foodActions';
import {useNavigation} from '@react-navigation/native';
import {Dish} from '../../../shared/interfaces/dish';
import useCreateDish from '../../../api/sugarCollector/hooks/useCreateDish';
import useUpdateDish from '../../../api/sugarCollector/hooks/useUpdateDish';
import useKitchenSelectedProducts from './useKitchenSelectedProducts';
import {KitchenProduct} from '../../../shared/interfaces/kitchenProduct';
import useNutritionalCalculations from '../../../shared/components/nutritionalValue/hooks/useNutritionalCalculations';
import productsToIngredient from '../utils/productsToIngredient';

interface UseDishConstructorRes {
  isProcessing: boolean;
  dish: Dish;
  onDishChange: (valueName: string) => (value: string) => void;
  selectedIds: string[];
  selectedProducts: KitchenProduct[];
  addSelectedProduct: (product: KitchenProduct) => void;
  removeSelectedId: (id: string) => void;
  setSelectedWeight: (id: string, weight: number) => void;
}

const useDishConstructor: () => UseDishConstructorRes = () => {
  const {
    foodState: {dish: sourceDish, isDishSaving},
    dispatchFoodState,
  } = useContext(FoodContext);

  const [dish, setDish] = useState<Dish>({
    _id: '',
    name: '',
    gi: '0',
    description: '',
    fats: '0',
    carbohydrates: '0',
    proteins: '0',
    updatedAt: 0,
    ingredients: {},
  });
  const {
    addSelectedProduct,
    removeSelectedId,
    selectedIds,
    selectedProducts,
    setSelectedWeight,
  } = useKitchenSelectedProducts({dish});

  const {createDish} = useCreateDish();
  const {updateDish} = useUpdateDish();
  const {navigate, goBack} = useNavigation();
  const {proteins, carbohydrates, fats} = useNutritionalCalculations({
    isDish: true,
    products: selectedProducts,
  });

  useEffect(() => {
    if (sourceDish) {
      setDish(sourceDish);
    }
  }, [sourceDish]);

  useEffect(() => {
    if (isDishSaving) {
      if (dish.name.trim() === '' || selectedProducts.length === 0) {
        dispatchFoodState(setIsDishSaving({value: false}));
        return;
      }
      const now = Date.now();
      const newDish = {
        ...dish,
        updatedAt: now,
        proteins,
        fats,
        carbohydrates,
        ingredients: productsToIngredient(selectedProducts),
      };

      if (dish._id === '') {
        createDish({...newDish, _id: now.toString()}).then(() => {
          dispatchFoodState(setIsDishSaving({value: false}));
          navigate('Dishes', {screen: 'DishesScreen'});
        });
        return;
      }
      updateDish(newDish).then(() => {
        dispatchFoodState(setIsDishSaving({value: false}));
        dispatchFoodState(setStateDish({value: dish}));
        goBack();
      });
    }
  }, [
    proteins,
    fats,
    carbohydrates,
    selectedProducts,
    navigate,
    goBack,
    dish,
    dispatchFoodState,
    updateDish,
    createDish,
    isDishSaving,
  ]);

  const onDishChange = (valueName: string) => (value: string) => {
    if (
      (valueName === 'carbohydrates' ||
        valueName === 'proteins' ||
        valueName === 'fats') &&
      Number.isNaN(+value)
    ) {
      return false;
    }

    setDish(prevState => ({
      ...prevState,
      [valueName]: value,
    }));
  };

  return {
    isProcessing: true,
    dish: dish,
    onDishChange: onDishChange,
    addSelectedProduct,
    removeSelectedId,
    selectedIds,
    selectedProducts,
    setSelectedWeight,
  };
};

export default useDishConstructor;
