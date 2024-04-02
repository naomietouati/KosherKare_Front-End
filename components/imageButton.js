import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const ImageButton = ({ imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={imageSource} style={{ width: 100, height: 100 }} />
    </TouchableOpacity>
  );
};

export default ImageButton;
