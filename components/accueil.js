import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Screen from './screen';
import Card from './card';

const { width, height } = Dimensions.get('window');

const Accueil = ({ children, userName }) => {
  return (
    <View>
      <Screen>
        <Text style={styles.welcomeText}>Bienvenue {userName}</Text>
        <Card text="Mes Habitudes Alimentaires" />
        <Card text="Mon Activité Physique" />
        <Card text="Mon Evolution" />
        <Card text="Mon Sommeil" />
        <Card text="Mon Carnet" />
        <Card text="Idées Repas" />
        <Card text="Profil" />
        <Card text="Mon Menu de la Semaine" />
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#ffffff', 
  },
});

export default Accueil;
