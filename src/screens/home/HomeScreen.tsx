import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SugarCollector from './containers/SugarCollector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  treatmentInfo: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const HomeScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SugarCollector />
    </SafeAreaView>
  );
};

export default HomeScreen;
