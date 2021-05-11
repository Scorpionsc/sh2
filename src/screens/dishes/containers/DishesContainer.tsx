import React, {FC, useMemo} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

import SearchControl from '../../../shared/components/searchControl/SearchControl';
import useSearch from '../../../shared/hooks/useSearch';
import useDishes from '../hooks/useDishes';
import useAppStateChange from '../../../shared/hooks/useAppStateChange';
import useGetDishes from '../../../api/sugarCollector/hooks/useGetDishes';
import {Dish} from '../../../shared/interfaces/dish';
import Dishes from '../components/products/Dishes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  padding: {
    height: 20,
  },
});

const DishesContainer: FC = () => {
  const {data, isLoading, reFetch} = useGetDishes();
  const dishes = useMemo(() => data || [], [data]);
  const {
    dishClickHandler,
    addDishHandler,
    deleteDishHandler,
    isDeleting,
  } = useDishes({onDishDeleted: reFetch, onDishFocus: reFetch});
  const {
    searchText,
    searchTextChangeHandler,
    filteredProducts,
  } = useSearch<Dish>({
    items: dishes || [],
  });

  useAppStateChange({
    onActivate: useMemo(() => reFetch, [reFetch]),
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Dishes
        dishes={filteredProducts}
        isLoading={isLoading}
        isDisabled={isDeleting}
        onReFetch={reFetch}
        onDishClick={dishClickHandler}
        onAddDish={addDishHandler}
        onDeleteDish={deleteDishHandler}
      />
      <SearchControl
        searchText={searchText}
        onChangeText={searchTextChangeHandler}
      />
      <View style={styles.padding} />
    </KeyboardAvoidingView>
  );
};

export default DishesContainer;
