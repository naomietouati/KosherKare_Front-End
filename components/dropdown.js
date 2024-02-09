import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const Dropdown = ({ label, values }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <Picker style={styles.dropdown}>
        {(values ?? []).map((value, index) => (
          <Picker.Item label={value} value={value} key={index} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default Dropdown;
