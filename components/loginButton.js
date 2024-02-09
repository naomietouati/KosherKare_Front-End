import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginButton = ({ buttonText, onPress }) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      <Text style={styles.loginButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#15e639',
    width: '80%',
    borderRadius: 10,
    paddingVertical: height * 0.03,
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: width * 0.04,
    fontFamily: 'Arial',
    fontWeight: '700',
  },
});

export default LoginButton;
