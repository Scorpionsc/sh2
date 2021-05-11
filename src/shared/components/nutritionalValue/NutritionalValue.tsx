import React, {FC} from 'react';
import {KitchenProduct} from '../../interfaces/kitchenProduct';
import {StyleSheet, Text, View} from 'react-native';
import useNutritionalCalculations from './hooks/useNutritionalCalculations';

const styles = StyleSheet.create({
  dishCalculations: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  dishCalculationsItem: {
    flex: 1,
    padding: 10,
  },
  dishCalculationsItemLook: {
    borderColor: '#cccccc',
    borderLeftWidth: 1,
  },
  dishCalculationsTitle: {
    fontSize: 10,
    color: '#535353',
  },
  dishCalculationsValue: {
    fontSize: 18,
    color: '#535353',
  },
  dishCalculationsUnit: {
    fontSize: 12,
    color: '#535353',
  },
  dishCalculationsLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

interface NutritionalValueProps {
  products: KitchenProduct[];
  isDish?: boolean;
}

const NutritionalValue: FC<NutritionalValueProps> = ({
  products,
  isDish = false,
}) => {
  const {proteins, fats, carbohydrates, calories} = useNutritionalCalculations({
    products,
    isDish,
  });

  return (
    <View style={styles.dishCalculations}>
      <View style={[styles.dishCalculationsItem]}>
        <Text style={styles.dishCalculationsTitle}>Carbs:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>
            {Math.round(+carbohydrates)}
          </Text>
          <Text style={styles.dishCalculationsUnit}>g</Text>
        </View>
      </View>
      <View
        style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Proteins:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>
            {Math.round(+proteins)}
          </Text>
          <Text style={styles.dishCalculationsUnit}>g</Text>
        </View>
      </View>
      <View
        style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Fats:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>{Math.round(+fats)}</Text>
          <Text style={styles.dishCalculationsUnit}>g</Text>
        </View>
      </View>
      <View
        style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Calories:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>
            {Math.round(calories)}
          </Text>
          <Text style={styles.dishCalculationsUnit}>kKal</Text>
        </View>
      </View>
    </View>
  );
};

export default NutritionalValue;
