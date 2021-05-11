import React, {FC} from 'react';
import ProductsContainer from './containers/ProductsContainer';
import {SafeAreaView, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const ProductsScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProductsContainer />
    </SafeAreaView>
  );
};

export default ProductsScreen;
