import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ text }) => {
  return (
    <Text style={styles.title}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Poppins',
    fontWeight: '800',
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: 20, // Ajoutez une marge en dessous du titre
  },
});

export default Title;
