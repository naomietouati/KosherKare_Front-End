import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NumberInput = ({ value, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    marginHorizontal: 20,
    fontSize: 20,
    color: 'white', // Texte en blanc
  },
  button: {
    backgroundColor: 'green', // Couleur de fond verte
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Texte des boutons en blanc
    fontSize: 20,
  },
});

export default NumberInput;
