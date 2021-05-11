import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import TextField from '../../../shared/components/textField/TextField';
import {Dish} from '../../../shared/interfaces/dish';

const styles = StyleSheet.create({
  dishFabricLine: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
});

interface DishConstructorProps {
  dish: Dish;
  onDishChange: (valueName: string) => (value: string) => void;
}

const DishConstructor: FC<DishConstructorProps> = ({dish, onDishChange}) => {
  return (
    <View>
      <TextField
        style={[styles.dishFabricLine]}
        label={'Dish name:'}
        isRequired={true}
        value={dish.name}
        onChangeText={onDishChange('name')}
      />
      <TextField
        label={'Description:'}
        value={dish.description}
        isMultiline={true}
        numberOfLines={4}
        onChangeText={onDishChange('description')}
      />
    </View>
  );
};

export default DishConstructor;
