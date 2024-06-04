import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ImageButton = ({ imageSource, onPress, isSelected }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, isSelected && styles.selectedButton]}>
      <Image source={imageSource} style={[styles.image, isSelected && styles.selectedImage]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedButton: {
    borderColor: 'green',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  selectedImage: {
    opacity: 0.5,
  },
});

export default ImageButton;
