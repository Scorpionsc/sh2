import React, {FC} from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface AddButtonProps {
  style: ViewStyle;
  onPress: () => void;
}

const AddButton: FC<AddButtonProps> = ({onPress, style}) => {
  return (
    <TouchableOpacity>
      <View style={[styles.wrap, style]}>
        <Icon name="add-outline" color="#cccccc" size={30} onPress={onPress}/>
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;
