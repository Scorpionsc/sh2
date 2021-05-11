import {useCallback, useEffect, useState} from 'react';
import textFilter from '../utils/textFilter';

interface UseSearchRes<T> {
  searchText: string;
  searchTextChangeHandler: (val: string) => void;
  filteredProducts: T[];
}

interface UseSearchProps<T> {
  items: T[];
  limitWords?: number;
  minLettersCount?: number;
}

const useSearch: <R extends {name: string}>(
  props: UseSearchProps<R>,
) => UseSearchRes<R> = <R extends {name: string}>({
  // @ts-ignore
  items,
  limitWords = 10,
  minLettersCount = 3,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<R[]>([]);
  const searchTextChangeHandler = useCallback<(val: string) => void>(val => {
    setSearchText(val);
  }, []);

  useEffect(() => {
    const text = searchText.trim();

    if (text.length >= minLettersCount) {
      const filteredItems = [
        ...textFilter<R>(
          items,
          item => item.name.toLowerCase().includes(text.toLowerCase()),
          limitWords,
        ),
      ];
      setFilteredProducts(filteredItems);
      return;
    }

    setFilteredProducts([]);
  }, [items, searchText, limitWords, minLettersCount]);

  return {
    searchText,
    searchTextChangeHandler,
    filteredProducts,
  };
};

export default useSearch;
