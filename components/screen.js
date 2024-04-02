import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Screen = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={[styles.screen, { height }]}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#161616',
  },
});

export default Screen;
