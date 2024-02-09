import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const InputField = ({ placeholder, secureTextEntry, onChangeText }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [text, setText] = useState('');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChangeText = (inputText) => {
    setText(inputText);
    onChangeText(inputText); // Appel de la fonction de mise à jour externe
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#bebebe"
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        onChangeText={handleChangeText} // Gestion du changement de texte
        value={text} // Valeur du champ de texte
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    backgroundColor: '#121212',
    color: '#ffffff',
    fontSize: height * 0.025,
    fontFamily: 'Arial',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    width: width * 0.8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#323232',
  },
  iconContainer: {
    position: 'absolute',
    right: width * 0.05,
    top: height * 0.015,
  },
  icon: {
    color: '#ffffff',
    fontSize: height * 0.03,
  },
});

export default InputField;
