import React, {FC} from 'react';
import {KitchenProduct} from '../../interfaces/kitchenProduct';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextField from '../../../../shared/components/textField/TextField';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  ingredientsEditor: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ingredientField: {
    flex: 1,
  },
  ingredientFirst: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
  trashButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  roundButton: {
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cccccc',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

interface FoodDashboardProps {
  onDelete: (id: string) => void;
  products: KitchenProduct[];
  onIngredientWeightChange: (id: string, weight: number) => void;
}

const FoodDashboard: FC<FoodDashboardProps> = ({
  onDelete,
  products,
  onIngredientWeightChange,
}) => {
  const changeValueHandler = (id: string) => (weight: string) => {
    onIngredientWeightChange(id, +weight);
  };

  const blurInputHandler = (id: string) => (weight?: string) => {
    if (Number.isNaN(weight)) {
      onIngredientWeightChange(id, 0);
    }
  };
  const deleteHandler = (id: string) => () => {
    onDelete(id);
  };

  return (
    <View style={styles.ingredientsEditor}>
      {products.map(({id, name, weight}, index) => (
        <View key={id} style={styles.ingredient}>
          <TextField
            style={[
              styles.ingredientField,
              ...(index === 0 ? [styles.ingredientFirst] : []),
            ]}
            label={`${name}(g):`}
            keyboardType={'decimal-pad'}
            isRequired={true}
            value={weight !== undefined ? weight.toString() : undefined}
            onChangeText={changeValueHandler(id)}
            onBlur={blurInputHandler(id)}
          />
          <TouchableOpacity
            style={[styles.roundButton]}
            onPress={deleteHandler(id)}>
            <Icon name="md-trash" color="#535353" size={30} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default FoodDashboard;
