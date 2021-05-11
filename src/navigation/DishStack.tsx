import React, {FC, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import FoodContext from '../store/foodContext';
import DishScreen from '../screens/dish/DishScreen';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {setIsDishSaving} from '../store/foodActions';
import DishConstructorScreen from '../screens/dishConstructor/DishConstructorScreen';

const styles = StyleSheet.create({
  loader: {
    marginRight: 10,
  },
});

const Stack = createStackNavigator();

const DishStack: FC = () => {
  const {
    foodState: {title, isDishSaving},
    dispatchFoodState,
  } = useContext(FoodContext);
  const {navigate} = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DishScreen"
        component={DishScreen}
        options={{
          headerTitle: title,
          headerBackTitleVisible: false,
          headerTintColor: '#cccccc',
          headerTitleStyle: {
            color: '#535353',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate('DishConstructorScreen')}>
              <Icon name="create-outline" color="#cccccc" size={30} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DishConstructorScreen"
        component={DishConstructorScreen}
        options={{
          headerTitle: 'Edit Dish',
          headerBackTitleVisible: false,
          headerTintColor: '#cccccc',
          headerTitleStyle: {
            color: '#535353',
          },
          headerRight: () => (
            <View style={styles.loader}>
              {isDishSaving ? (
                <ActivityIndicator size="small" />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    dispatchFoodState(setIsDishSaving({value: true}))
                  }>
                  <Icon name="checkmark-outline" color="#cccccc" size={30} />
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DishStack;
