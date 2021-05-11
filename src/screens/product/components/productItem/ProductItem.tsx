import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Product} from '../../../../shared/interfaces/product';
import calculateCalories from '../../../../shared/utils/calculateCalories';

interface ProductProps {
  product: Product;
}

const styles = StyleSheet.create({
  productFabricView: {
    marginRight: 20,
    marginLeft: 20,
  },
  productFabricViewTitle: {
    color: '#535353',
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  productFabricViewRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#cccccc',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  productFabricViewRowTitle: {
    color: '#535353',
    fontSize: 18,
    flex: 2,
  },
  productFabricViewValues: {
    alignSelf: 'stretch',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  productFabricViewValue: {
    color: '#535353',
    fontSize: 20,
  },
  productFabricViewUnit: {
    color: '#535353',
    fontSize: 16,
  },
  productFabricDescription: {
    borderColor: '#535353',
    borderTopWidth: 1,
    paddingTop: 20,
  },
  productFabricDescriptionTitle: {
    fontSize: 18,
    color: '#535353',
    marginBottom: 10,
  },
  productFabricDescriptionValue: {
    color: '#535353',
    fontSize: 16,
  },
});

const ProductItem: FC<ProductProps> = ({product}) => {
  return (
    <View style={styles.productFabricView}>
      <View style={styles.productFabricViewRow}>
        <Text style={styles.productFabricViewRowTitle}>Calories:</Text>
        <View style={styles.productFabricViewValues}>
          <Text style={styles.productFabricViewValue}>
            {Math.round(calculateCalories(product))}
          </Text>
          <Text style={styles.productFabricViewUnit}> kcal</Text>
        </View>
      </View>
      <View style={styles.productFabricViewRow}>
        <Text style={styles.productFabricViewRowTitle}>Proteins:</Text>
        <View style={styles.productFabricViewValues}>
          <Text style={styles.productFabricViewValue}>
            {(+product.proteins).toFixed(2)}
          </Text>
          <Text style={styles.productFabricViewUnit}> g</Text>
        </View>
      </View>
      <View style={styles.productFabricViewRow}>
        <Text style={styles.productFabricViewRowTitle}>Fats:</Text>
        <View style={styles.productFabricViewValues}>
          <Text style={styles.productFabricViewValue}>
            {(+product.fats).toFixed(2)}
          </Text>
          <Text style={styles.productFabricViewUnit}> g</Text>
        </View>
      </View>
      <View style={styles.productFabricViewRow}>
        <Text style={styles.productFabricViewRowTitle}>Carbohydrates:</Text>
        <View style={styles.productFabricViewValues}>
          <Text style={styles.productFabricViewValue}>
            {(+product.carbohydrates).toFixed(2)}
          </Text>
          <Text style={styles.productFabricViewUnit}> g</Text>
        </View>
      </View>
      {product.description !== '' && (
        <View style={styles.productFabricDescription}>
          <Text style={styles.productFabricDescriptionTitle}>Description:</Text>
          <Text style={styles.productFabricDescriptionValue}>
            {product.description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductItem;
