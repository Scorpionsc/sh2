import React, {FC, useMemo} from 'react';
import DishConstructor from '../components/DishConstructor';
import useDishConstructor from '../hooks/useDishConstructor';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import SearchControl from '../../../shared/components/searchControl/SearchControl';
import useSearch from '../../../shared/hooks/useSearch';
import NutritionalValue from '../../../shared/components/nutritionalValue/NutritionalValue';
import {KitchenProduct} from '../../../shared/interfaces/kitchenProduct';
import FoodDashboard from '../../../shared/components/foodDashboard/FoodDashboard';
import FoodSelector from '../../../shared/components/foodSelector/FoodSelector';
import useGetKitchenProduct from '../../calculator/hooks/useGetKitchenProduct';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  padding: {
    height: 20,
  },
});

const DishConstructorContainer: FC = () => {
  const {
    dish,
    onDishChange,
    addSelectedProduct,
    removeSelectedId,
    selectedIds,
    selectedProducts,
    setSelectedWeight,
  } = useDishConstructor();
  const {kitchenProducts, isLoading, reFetch} = useGetKitchenProduct();
  const {
    searchText,
    searchTextChangeHandler,
    filteredProducts,
  } = useSearch<KitchenProduct>({
    items: kitchenProducts || [],
  });

  const nutritionalValue = useMemo(
    () => <NutritionalValue products={selectedProducts} isDish={true} />,
    [selectedProducts],
  );

  const foodDashboard = useMemo(
    () => (
      <FoodDashboard
        products={selectedProducts}
        onDelete={removeSelectedId}
        onIngredientWeightChange={setSelectedWeight}
      />
    ),
    [selectedProducts, removeSelectedId, setSelectedWeight],
  );

  const foodSelector = useMemo(
    () => (
      <FoodSelector
        products={filteredProducts}
        selectedIds={selectedIds}
        selectProductHandler={addSelectedProduct}
      />
    ),
    [filteredProducts, selectedIds, addSelectedProduct],
  );

  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <DishConstructor dish={dish} onDishChange={onDishChange} />
        {nutritionalValue}
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={reFetch} />
          }>
          {foodDashboard}
          {foodSelector}
        </ScrollView>
        <SearchControl
          searchText={searchText}
          onChangeText={searchTextChangeHandler}
        />
        <View style={styles.padding} />
      </KeyboardAvoidingView>
    </>
  );
};

export default DishConstructorContainer;
