import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './navigation/MainStack';
import DismissKeyboard from './shared/components/dismissKeyboard/DismissKeyboard';
import FoodProvider from './store/foodProvider';

const App = () => {
  return (
    <DismissKeyboard>
      <FoodProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </FoodProvider>
    </DismissKeyboard>
  );
};

export default App;
