import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Screen from './screen';
import Footer from './footer';
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation depuis @react-navigation/native
import Card from './card'; // Importez le composant Card

const { width, height } = Dimensions.get('window');

const Accueil = ({ children, userName }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Screen>
        <Text style={styles.welcomeText}>Bienvenue {userName}</Text>

        <Card text="Mes Habitudes Alimentaires" onPress={() => navigation.navigate('EatingHabits')} />
        <Card text="Mon Activité Physique" onPress={() => navigation.navigate('PhysicalActivity')} />
        <Card text="Mon Evolution" onPress={() => navigation.navigate('Evolution')} />
        <Card text="Mon Sommeil" onPress={() => navigation.navigate('Sleep')} />
        <Card text="Mon Carnet" onPress={() => navigation.navigate('Notebook')} />
        <Card text="Idées Repas" onPress={() => navigation.navigate('MealIdeas')} />
        <Card text="Profil" onPress={() => navigation.navigate('Profile')} />
        <Card text="Mon Menu de la Semaine" onPress={() => navigation.navigate('WeeklyMenu')} />
        <Footer></Footer>
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
