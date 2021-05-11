import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DishesScreen from '../screens/dishes/DishesScreen';
import DishStack from './DishStack';

const Stack = createStackNavigator();

const DishesStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DishesScreen"
        options={{
          headerShown: false,
        }}
        component={DishesScreen}
      />
      <Stack.Screen
        name="DishStack"
        component={DishStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DishesStack;
