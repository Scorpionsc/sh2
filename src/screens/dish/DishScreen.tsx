import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DishContainer from './containers/DishContainer';

const styles = StyleSheet.create({
  productFabric: {
    flex: 1,
  },
});

const DishScreen: FC = () => {
  return (
    <SafeAreaView style={styles.productFabric}>
      <DishContainer />
    </SafeAreaView>
  );
};

export default DishScreen;
