import React, {FC} from 'react';
import DishConstructorContainer from './containers/DishConstructorContainer';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DishConstructorScreen: FC = () => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <DishConstructorContainer />
    </KeyboardAvoidingView>
  );
};

export default DishConstructorScreen;
