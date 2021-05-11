import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  menuItem: {
    alignSelf: 'stretch',
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrap: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 20,
    color: '#535353',
    paddingVertical: 15,
  },
  selected: {
    borderLeftColor: '#3498db',
  },
});

interface MenuItemProps {
  title: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  onDelete?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({
  title,
  isActive = false,
  onClick,
  isDisabled = false,
  onDelete,
}) => {
  return (
    <View style={[styles.menuItem]}>
      <View style={styles.titleWrap}>
        {isActive ? (
          <Text style={[styles.menuItemTitle]}>{title}</Text>
        ) : (
          <TouchableOpacity onPress={onClick} disabled={isDisabled}>
            <Text style={[styles.menuItemTitle]}>{title}</Text>
          </TouchableOpacity>
        )}
      </View>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} disabled={isDisabled}>
          <Icon name="trash-outline" color="#cccccc" size={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MenuItem;
