import useGetProducts from '../../../api/sugarCollector/hooks/useGetProducts';
import useGetDishes from '../../../api/sugarCollector/hooks/useGetDishes';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {KitchenProduct} from '../interfaces/kitchenProduct';
import ingredientsToEnergyValue from '../../../shared/utils/ingredientsToEnergyValue';
import FoodType from '../enums/foodType';

interface UseGetKitchenProductRes {
  isLoading: boolean;
  kitchenProducts: KitchenProduct[];
  reFetch: () => void;
}

const useGetKitchenProduct: () => UseGetKitchenProductRes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [kitchenProducts, setKitchenProducts] = useState<KitchenProduct[]>([]);
  const {
    isLoading: isProductsLoading,
    data: products,
    reFetch: reFetchProducts,
  } = useGetProducts();
  const {
    isLoading: isDishesLoading,
    data: dishes,
    reFetch: reFetchDishes,
  } = useGetDishes();

  useEffect(() => {
    setIsLoading(prevState => {
      if (isProductsLoading && isDishesLoading) {
        return !prevState ? true : prevState;
      }
      return prevState ? false : prevState;
    });
  }, [isProductsLoading, isDishesLoading]);

  useEffect(() => {
    if (products) {
      setKitchenProducts(prevState => [
        ...prevState.filter(item => item.type === FoodType.Dish),
        ...products.map(product => ({
          id: product._id,
          carbohydrates: +product.carbohydrates,
          description: product.description,
          fats: +product.fats,
          name: product.name,
          proteins: +product.proteins,
          type: FoodType.Product,
        })),
      ]);
    }
  }, [products]);

  useEffect(() => {
    if (dishes) {
      setKitchenProducts(prevState => [
        ...prevState.filter(item => item.type === FoodType.Product),
        ...dishes.map(dish => ({
          id: dish._id,
          description: dish.description,
          name: dish.name,
          type: FoodType.Dish,
          ...ingredientsToEnergyValue(dish.ingredients),
        })),
      ]);
    }
  }, [dishes]);

  const reFetch = useCallback(async () => {
    if (!isLoading) {
      await setKitchenProducts([]);
      reFetchProducts();
      reFetchDishes();
    }
  }, [isLoading, reFetchProducts, reFetchDishes]);

  const sortedProducts = useMemo(
    () =>
      kitchenProducts.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }),
    [kitchenProducts],
  );

  return {
    isLoading,
    kitchenProducts: sortedProducts,
    reFetch,
  };
};

export default useGetKitchenProduct;
