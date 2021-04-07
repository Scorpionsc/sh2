import {useCallback, useEffect, useState} from 'react';
import {KitchenProduct} from '../interfaces/kitchenProduct';

interface UseKitchenSearchRes {
  searchText: string;
  searchTextChangeHandler: (val: string) => void;
  filteredProducts: KitchenProduct[];
}

interface UseKitchenSearchProps {
  products: KitchenProduct[];
}

const useKitchenSearch: (
  props: UseKitchenSearchProps,
) => UseKitchenSearchRes = ({products}) => {
  const limit = 10;
  const minWordsCount = 3;
  const [searchText, setSearchText] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<KitchenProduct[]>(
    [],
  );
  const searchTextChangeHandler = useCallback<(val: string) => void>(val => {
    setSearchText(val);
  }, []);

  useEffect(() => {
    const text = searchText.trim();

    function* filter(
      array: KitchenProduct[],
      condition: (data: KitchenProduct) => boolean,
      maxSize: number,
    ) {
      if (!maxSize || maxSize > array.length) {
        maxSize = array.length;
      }
      let count = 0;
      let i = 0;
      while (count < maxSize && i < array.length) {
        if (condition(array[i])) {
          yield array[i];
          count++;
        }
        i++;
      }
    }

    if (text.length >= minWordsCount) {
      const filteredItems = [
        ...filter(
          products,
          item => item.name.toLowerCase().includes(text.toLowerCase()),
          limit,
        ),
      ];
      setFilteredProducts(filteredItems);
      return;
    }

    setFilteredProducts([]);
  }, [products, searchText]);

  return {
    searchText,
    searchTextChangeHandler,
    filteredProducts,
  };
};

export default useKitchenSearch;
