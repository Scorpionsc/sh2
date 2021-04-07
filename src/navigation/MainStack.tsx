import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalculatorScreen from '../screens/calculator/CalculatorScreen';
import FoodScreen from '../screens/food/FoodScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainStack: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Calculator') {
            iconName = focused ? 'ios-calculator' : 'ios-calculator-outline';
          } else if (route.name === 'Food') {
            iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
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
      <Tab.Screen name="Food" component={FoodScreen} />
    </Tab.Navigator>
  );
};

export default MainStack;
