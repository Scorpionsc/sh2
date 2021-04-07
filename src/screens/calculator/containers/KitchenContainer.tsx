import React, {FC, useMemo} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import SearchControl from '../components/searchControl/SearchControl';
import useKitchenSearch from '../hooks/useKitchenSearch';
import useGetKitchenProduct from '../hooks/useGetKitchenProduct';
import FoodSelector from '../components/foodSelector/FoodSelector';
import FoodDashboard from '../components/foodDashboard/FoodDashboard';
import useKitchenSelectedProducts from '../hooks/useKitchenSelectedProducts';
import NutritionalValue from '../components/nutritionalValue/NutritionalValue';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
});

const KitchenContainer: FC = () => {
  const {kitchenProducts, isLoading, reFetch} = useGetKitchenProduct();
  const {
    searchText,
    searchTextChangeHandler,
    filteredProducts,
  } = useKitchenSearch({
    products: kitchenProducts,
  });
  const {
    addSelectedProduct,
    removeSelectedId,
    selectedIds,
    selectedProducts,
    setSelectedWeight,
  } = useKitchenSelectedProducts();

  const nutritionalValue = useMemo(
    () => <NutritionalValue products={selectedProducts} />,
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
    <View style={styles.container}>
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
    </View>
  );
};

export default KitchenContainer;
