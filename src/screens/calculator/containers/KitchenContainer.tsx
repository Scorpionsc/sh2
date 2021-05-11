import React, {FC, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import SearchControl from '../../../shared/components/searchControl/SearchControl';
import useGetKitchenProduct from '../hooks/useGetKitchenProduct';
import FoodSelector from '../../../shared/components/foodSelector/FoodSelector';
import FoodDashboard from '../../../shared/components/foodDashboard/FoodDashboard';
import useKitchenSelectedProducts from '../hooks/useKitchenSelectedProducts';
import NutritionalValue from '../../../shared/components/nutritionalValue/NutritionalValue';
import {KitchenProduct} from '../../../shared/interfaces/kitchenProduct';
import useSearch from '../../../shared/hooks/useSearch';

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

const KitchenContainer: FC = () => {
  const {kitchenProducts, isLoading, reFetch} = useGetKitchenProduct();
  const {
    searchText,
    searchTextChangeHandler,
    filteredProducts,
  } = useSearch<KitchenProduct>({
    items: kitchenProducts,
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
  );
};

export default KitchenContainer;
