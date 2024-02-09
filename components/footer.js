import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const handleHomePress = () => {
    // Logique à exécuter lors du clic sur l'icône de la maison
  };

  const handleUserPress = () => {
    // Logique à exécuter lors du clic sur l'icône de l'utilisateur
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress} style={styles.iconButton}>
        <Icon name="home" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUserPress} style={styles.iconButton}>
        <Icon name="user" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#323232', // Couleur de fond gris foncé
    height: 50, // Hauteur du footer
    flexDirection: 'row', // Alignement des icônes dans une rangée
    justifyContent: 'space-around', // Espace égal entre les icônes
    alignItems: 'center', // Centrer le contenu verticalement
    width: '100%', 
  },
  iconButton: {
    padding: 10, 
  },
});

export default Footer;
