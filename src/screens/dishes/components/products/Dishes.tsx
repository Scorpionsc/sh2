import React, {FC} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import MenuItem from '../../../../shared/components/menuItem/MenuItem';
import AddButton from '../../../../shared/components/addButton/AddButton';
import {Dish} from '../../../../shared/interfaces/dish';

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

interface DishesProps {
  dishes: Dish[];
  isLoading: boolean;
  isDisabled: boolean;
  onReFetch: () => void;
  onDishClick: (item: Dish) => void;
  onAddDish: () => void;
  onDeleteDish: (dish: Dish) => void;
}

const Dishes: FC<DishesProps> = ({
  dishes,
  isLoading,
  isDisabled,
  onReFetch,
  onDeleteDish,
  onAddDish,
  onDishClick,
}) => {
  const clickHandler = (dish: Dish) => () => {
    onDishClick(dish);
  };

  return (
    <View style={styles.mainArea}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onReFetch} />
        }>
        {dishes.map(dish => (
          <MenuItem
            title={dish.name}
            onClick={clickHandler(dish)}
            key={dish._id}
            isDisabled={isDisabled}
            onDelete={() => onDeleteDish(dish)}
          />
        ))}
      </ScrollView>
      <AddButton style={styles.addButton} onPress={onAddDish} />
    </View>
  );
};

export default Dishes;
