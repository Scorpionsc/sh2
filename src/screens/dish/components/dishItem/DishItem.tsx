import React, {FC} from 'react';
import {Dish} from '../../../../shared/interfaces/dish';
import {StyleSheet, Text, View} from 'react-native';
import {Ingredient} from '../../../../shared/interfaces/ingredient';
import NutritionalValue from '../../../../shared/components/nutritionalValue/NutritionalValue';
import FoodType from '../../../calculator/enums/foodType';

const styles = StyleSheet.create({
  dishFabricView: {
    marginRight: 20,
    marginLeft: 20,
  },
  dishFabricViewTitle: {
    color: '#535353',
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  dishFabricDescription: {
    borderColor: '#cccccc',
    borderTopWidth: 1,
    paddingTop: 20,
    marginBottom: 20,
  },
  dishFabricDescriptionTitle: {
    fontSize: 18,
    color: '#535353',
    marginBottom: 10,
  },
  dishFabricDescriptionValue: {
    color: '#535353',
    fontSize: 16,
  },
  dishFabricViewRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#cccccc',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dishFabricViewRowTitle: {
    color: '#535353',
    fontSize: 18,
    flex: 2,
  },
  dishFabricViewValues: {
    alignSelf: 'stretch',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  dishFabricViewValue: {
    color: '#535353',
    fontSize: 20,
  },
  dishFabricViewUnit: {
    color: '#535353',
    fontSize: 16,
  },
});

interface DishItemProps {
  dish: Dish;
}

const DishItem: FC<DishItemProps> = ({dish}) => {
  const renderIngredients = (ingredients: Record<string, Ingredient>) =>
    Object.values(ingredients).map(ingredient => {
      const lineData = {
        title: ingredient.title,
        value: ingredient.weight.toString(),
        unit: 'g',
        key: ingredient.id,
      };

      return renderLine(lineData);
    });

  const renderLine = ({
    title,
    value,
    unit,
    key,
  }: {
    title: string;
    value: string;
    unit: string;
    key: string;
  }) => (
    <View style={styles.dishFabricViewRow} key={key}>
      <Text style={styles.dishFabricViewRowTitle}>{title}:</Text>
      <View style={styles.dishFabricViewValues}>
        <Text style={styles.dishFabricViewValue}>{Math.round(+value)}</Text>
        {unit && <Text style={styles.dishFabricViewUnit}>{unit}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.dishFabricView}>
      <NutritionalValue
        products={Object.values(dish.ingredients).map(ingredient => ({
          id: ingredient.id,
          proteins: ingredient.proteins,
          fats: ingredient.fats,
          carbohydrates: ingredient.carbohydrates,
          weight: ingredient.weight,
          name: '',
          description: '',
          type: FoodType.Product,
        }))}
        isDish={true}
      />
      {dish.description !== '' ? (
        <View style={styles.dishFabricDescription}>
          <Text style={styles.dishFabricDescriptionTitle}>Description:</Text>
          <Text style={styles.dishFabricDescriptionValue}>
            {dish.description}
          </Text>
        </View>
      ) : null}
      {renderIngredients(dish.ingredients)}
    </View>
  );
};

export default DishItem;
