import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SugarCollector from './containers/SugarCollector';
import KitchenContainer from './containers/KitchenContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const CalculatorScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SugarCollector />
      <KitchenContainer />
    </SafeAreaView>
  );
};

export default CalculatorScreen;
