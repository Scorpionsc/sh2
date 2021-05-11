import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CalculatorScreen from '../screens/calculator/CalculatorScreen';
import ProductsStack from './ProductsStack';
import DishesStack from './DishesStack';

const Tab = createBottomTabNavigator();

const MainStack: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Calculator') {
            iconName = focused ? 'ios-calculator' : 'ios-calculator-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'pizza' : 'pizza-outline';
          } else if (route.name === 'Dishes') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#535353',
        inactiveTintColor: '#cccccc',
      }}>
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Dishes" component={DishesStack} />
    </Tab.Navigator>
  );
};

export default MainStack;
