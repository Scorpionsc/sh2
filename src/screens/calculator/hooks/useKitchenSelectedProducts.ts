import {KitchenProduct} from '../interfaces/kitchenProduct';
import {useCallback, useState} from 'react';

interface UseKitchenSelectedProductsRes {
  selectedIds: string[];
  selectedProducts: KitchenProduct[];
  addSelectedProduct: (product: KitchenProduct) => void;
  removeSelectedId: (id: string) => void;
  setSelectedWeight: (id: string, weidht: number) => void;
}

const useKitchenSelectedProducts: () => UseKitchenSelectedProductsRes = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<KitchenProduct[]>(
    [],
  );

  const addSelectedProduct = useCallback((product: KitchenProduct) => {
    setSelectedIds(prevState => [...prevState, product.id]);
    setSelectedProducts(prevState => [...prevState, {...product, weight: 0}]);
  }, []);
  const removeSelectedId = useCallback((id: string) => {
    console.log(id);
    console.log(setSelectedIds);
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
