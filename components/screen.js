import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Screen = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#161616',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.1,
  },
});

export default Screen;