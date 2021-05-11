import React, {FC} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import MenuItem from '../../../../shared/components/menuItem/MenuItem';
import AddButton from '../../../../shared/components/addButton/AddButton';
import {Product} from '../../../../shared/interfaces/product';

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
  scrollView: {
    flex: 1,
  },
});

interface ProductsProps {
  products: Product[];
  isLoading: boolean;
  isDisabled: boolean;
  onReFetch: () => void;
  onProductClick: (item: Product) => void;
  onAddProduct: () => void;
  onDeleteProduct: (product: Product) => void;
}

const Products: FC<ProductsProps> = ({
  products,
  isLoading,
  isDisabled,
  onReFetch,
  onDeleteProduct,
  onAddProduct,
  onProductClick,
}) => {
  const clickHandler = (product: Product) => () => {
    onProductClick(product);
  };

  return (
    <View style={styles.mainArea}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onReFetch} />
        }>
        {products.map(product => (
          <MenuItem
            title={product.name}
            onClick={clickHandler(product)}
            key={product._id}
            isDisabled={isDisabled}
            onDelete={() => onDeleteProduct(product)}
          />
        ))}
      </ScrollView>
      <AddButton style={styles.addButton} onPress={onAddProduct} />
    </View>
  );
};

export default Products;
