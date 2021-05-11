import {useCallback, useEffect, useState} from 'react';
import {Dish} from '../../../shared/interfaces/dish';
import {KitchenProduct} from '../../../shared/interfaces/kitchenProduct';

interface UseKitchenSelectedProductsRes {
  selectedIds: string[];
  selectedProducts: KitchenProduct[];
  addSelectedProduct: (product: KitchenProduct) => void;
  removeSelectedId: (id: string) => void;
  setSelectedWeight: (id: string, weight: number) => void;
}

interface UseKitchenSelectedProductsProps {
  dish: Dish;
}

const useKitchenSelectedProducts: (
  props: UseKitchenSelectedProductsProps,
) => UseKitchenSelectedProductsRes = ({dish}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [selectedProducts, setSelectedProducts] = useState<KitchenProduct[]>(
    [],
  );

  useEffect(() => {
    const ingredients = Object.values(dish.ingredients);

    if (ingredients.length) {
      setSelectedIds(Object.keys(dish.ingredients));
      setSelectedProducts(
        ingredients.map(ingredient => ({
          id: ingredient.id,
          weight: ingredient.weight,
          fats: ingredient.fats,
          name: ingredient.title,
          proteins: ingredient.proteins,
          type: ingredient.type,
          carbohydrates: ingredient.carbohydrates,
          description: '',
        })),
      );
    }
  }, [dish.ingredients]);

  const addSelectedProduct = useCallback((product: KitchenProduct) => {
    setSelectedIds(prevState => [...prevState, product.id]);
    setSelectedProducts(prevState => [...prevState, {...product, weight: 0}]);
  }, []);

  const removeSelectedId = useCallback((id: string) => {
    setSelectedIds(prevState => prevState.filter(item => item !== id));
    setSelectedProducts(prevState => prevState.filter(item => item.id !== id));
  }, []);

  const setSelectedWeight = useCallback((id, weight) => {
    setSelectedProducts(prevState =>
      prevState.map(product => {
        if (id !== product.id) {
          return product;
        }

        return {
          ...product,
          weight,
        };
      }),
    );
  }, []);

  return {
    selectedIds,
    selectedProducts,
    addSelectedProduct,
    removeSelectedId,
    setSelectedWeight,
  };
};

export default useKitchenSelectedProducts;
