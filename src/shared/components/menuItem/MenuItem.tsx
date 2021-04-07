import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  menuItem: {
    alignSelf: 'stretch',
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
  },
  menuItemTitle: {
    fontSize: 20,
    color: '#535353',
  },
  selected: {
    borderLeftColor: '#3498db',
  },
});

interface MenuItemProps {
  title: string;
  isActive?: boolean;
  onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = ({title, isActive = false, onClick}) => {
  return isActive ? (
    <View style={[styles.menuItem, styles.selected]}>
      <Text style={[styles.menuItemTitle]}>{title}</Text>
    </View>
  ) : (
    <TouchableOpacity onPress={onClick}>
      <View style={[styles.menuItem]}>
        <Text style={[styles.menuItemTitle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
