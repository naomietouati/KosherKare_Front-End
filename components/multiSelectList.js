import React, { useState } from 'react';
import { View, Picker } from 'react-native';

const MultiSelectList = ({ values, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          onSelect(itemValue); 
        }}
      >
        {values.map((value, index) => (
          <Picker.Item key={index} label={value} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export default MultiSelectList;
