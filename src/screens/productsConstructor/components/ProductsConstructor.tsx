import React, {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import TextField from '../../../shared/components/textField/TextField';
import {Product} from '../../../shared/interfaces/product';

const styles = StyleSheet.create({
  dishFabricLine: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
  dishFabricScroll: {
    padding: 20,
  },
});

interface ProductsConstructorProps {
  product: Product;
  onProductChange: (valueName: string) => (value: string) => void;
}

const ProductsConstructor: FC<ProductsConstructorProps> = ({
  product,
  onProductChange,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.dishFabricScroll}>
      <TextField
        style={[styles.dishFabricLine]}
        label={'Product name:'}
        isRequired={true}
        value={product.name}
        onChangeText={onProductChange('name')}
      />
      <TextField
        label={'Proteins(g):'}
        value={product.proteins.toString()}
        isRequired={true}
        keyboardType={'decimal-pad'}
        onChangeText={onProductChange('proteins')}
      />
      <TextField
        label={'Fats(g):'}
        value={product.fats.toString()}
        isRequired={true}
        keyboardType={'decimal-pad'}
        onChangeText={onProductChange('fats')}
      />
      <TextField
        label={'Carbohydrates(g):'}
        value={product.carbohydrates.toString()}
        isRequired={true}
        keyboardType={'decimal-pad'}
        onChangeText={onProductChange('carbohydrates')}
      />
      <TextField
        label={'Description:'}
        value={product.description}
        isMultiline={true}
        numberOfLines={4}
        onChangeText={onProductChange('description')}
      />
    </ScrollView>
  );
};

export default ProductsConstructor;
