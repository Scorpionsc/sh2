import React, {FC, useCallback} from 'react';
import {KitchenProduct} from '../../interfaces/kitchenProduct';
import {StyleSheet, View} from 'react-native';
import MenuItem from '../../../../shared/components/menuItem/MenuItem';

const styles = StyleSheet.create({
  itemsSelector: {
    flex: 1,
    alignSelf: 'stretch',
  },
  itemsSelectorList: {
    alignSelf: 'stretch',
  },
});

interface FoodSelectorProps {
  products: KitchenProduct[];
  selectProductHandler: (product: KitchenProduct) => void;
  selectedIds: string[];
}

const FoodSelector: FC<FoodSelectorProps> = ({
  products,
  selectProductHandler,
  selectedIds,
}) => {
  const itemClickHandler = useCallback(
    (product: KitchenProduct, isSelected: boolean) => () => {
      if (!isSelected) {
        selectProductHandler(product);
      }
    },
    [selectProductHandler],
  );

  const getMenuItems = useCallback(
    item => {
      const isSelected = selectedIds.includes(item.id);
      return isSelected ? null : (
        <MenuItem
          key={`${item.id}Selector`}
          title={item.name}
          isActive={isSelected}
          onClick={itemClickHandler(item, isSelected)}
        />
      );
    },
    [selectedIds, itemClickHandler],
  );

  return <View style={styles.itemsSelector}>{products.map(getMenuItems)}</View>;
};

export default FoodSelector;
