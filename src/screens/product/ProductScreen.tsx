import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ProductContainer from './containers/ProductContainer';

const styles = StyleSheet.create({
  productFabric: {
    flex: 1,
  },
});

const ProductScreen: FC = () => {
  return (
    <SafeAreaView style={styles.productFabric}>
      <ProductContainer />
    </SafeAreaView>
  );
};

export default ProductScreen;
