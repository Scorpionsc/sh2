import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DishesContainer from './containers/DishesContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const DishesScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DishesContainer />
    </SafeAreaView>
  );
};

export default DishesScreen;
