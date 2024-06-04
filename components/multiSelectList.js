import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MultiSelectList = ({ values, onSelect }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleSelect = (item) => {
    const isSelected = selectedValues.includes(item);
    if (isSelected) {
      setSelectedValues(selectedValues.filter(value => value !== item));
    } else {
      setSelectedValues([...selectedValues, item]);
    }
  };

  return (
    <View>
      <FlatList
        data={values}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => toggleSelect(item)}
          >
            <View style={[styles.checkbox, { backgroundColor: selectedValues.includes(item) ? 'green' : 'transparent' }]}>
              {selectedValues.includes(item) && <View style={styles.innerCheckbox} />}
            </View>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCheckbox: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  itemText: {
    color: 'white',
  },
});

export default MultiSelectList;
