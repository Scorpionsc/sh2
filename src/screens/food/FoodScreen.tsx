import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const FoodScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>FoodScreen will be implemented later!</Text>
    </View>
  );
};

export default FoodScreen;
