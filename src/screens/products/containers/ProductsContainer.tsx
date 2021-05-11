import React, {FC, useMemo} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

import useGetProducts from '../../../api/sugarCollector/hooks/useGetProducts';
import SearchControl from '../../../shared/components/searchControl/SearchControl';
import useSearch from '../../../shared/hooks/useSearch';
import {Product} from '../../../shared/interfaces/product';
import Products from '../components/products/Products';
import useProducts from '../hooks/useProducts';
import useAppStateChange from '../../../shared/hooks/useAppStateChange';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  padding: {
    height: 20,
  },
});

const ProductsContainer: FC = () => {
  const {data, isLoading, reFetch} = useGetProducts();
  const products = useMemo(() => data || [], [data]);
  const {
    productClickHandler,
    addProductHandler,
    deleteProductHandler,
    isDeleting,
  } = useProducts({onProductDeleted: reFetch, onProductsFocus: reFetch});
  const {
    searchText,
    searchTextChangeHandler,
    filteredProducts,
  } = useSearch<Product>({
    items: products || [],
  });

  useAppStateChange({
    onActivate: useMemo(() => reFetch, [reFetch]),
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Products
        products={filteredProducts}
        isLoading={isLoading}
        isDisabled={isDeleting}
        onReFetch={reFetch}
        onProductClick={productClickHandler}
        onAddProduct={addProductHandler}
        onDeleteProduct={deleteProductHandler}
      />
      <SearchControl
        searchText={searchText}
        onChangeText={searchTextChangeHandler}
      />
      <View style={styles.padding} />
    </KeyboardAvoidingView>
  );
};

export default ProductsContainer;
