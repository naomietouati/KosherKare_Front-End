import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckBox = ({ label, isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.checkBox, isChecked && styles.checkedBox]} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: 'green',
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
});

export default CheckBox;
