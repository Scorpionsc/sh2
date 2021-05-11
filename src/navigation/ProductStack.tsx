import React, {FC, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FoodContext from '../store/foodContext';
import ProductScreen from '../screens/product/ProductScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductsConstructorScreen from '../screens/productsConstructor/ProductsConstructorScreen';
import {useNavigation} from '@react-navigation/native';
import {setIsProductSaving} from '../store/foodActions';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  loader: {
    marginRight: 10,
  },
});

const ProductsStack: FC = () => {
  const {
    foodState: {title, isProductSaving},
    dispatchFoodState,
  } = useContext(FoodContext);
  const {navigate} = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductItem"
        component={ProductScreen}
        options={{
          headerTitle: title,
          headerBackTitleVisible: false,
          headerTintColor: '#cccccc',
          headerTitleStyle: {
            color: '#535353',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate('ProductConstructor')}>
              <Icon name="create-outline" color="#cccccc" size={30} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ProductConstructor"
        component={ProductsConstructorScreen}
        options={{
          headerTitle: 'Edit product',
          headerBackTitleVisible: false,
          headerTintColor: '#cccccc',
          headerTitleStyle: {
            color: '#535353',
          },
          headerRight: () => (
            <View style={styles.loader}>
              {isProductSaving ? (
                <ActivityIndicator size="small" />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    dispatchFoodState(setIsProductSaving({value: true}))
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

export default ProductsStack;
