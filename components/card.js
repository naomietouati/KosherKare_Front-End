import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: height * 0.06,
    backgroundColor: '#323232',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#15e639',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  text: {
    color: '#15e639', // Modifier la couleur du texte en vert
    fontSize: height * 0.022,
    fontWeight: '400',
    textAlign: 'center',
  },
});

const Card = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
