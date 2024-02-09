import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Screen from './screen';
import LibelleCard from './libelleCard';
import Footer from './footer';


const { width, height } = Dimensions.get('window');

const EatingHabits = ({ children, userName }) => {
  return (
    <View>
      <Screen>
        <Text style={styles.welcomeText}>Habitudes Alimentaires {userName}</Text>
        <LibelleCard label={"Petit déjeuner"}></LibelleCard>
        <LibelleCard label={"Collation"}></LibelleCard>
        <LibelleCard label={"Diner"}></LibelleCard>
        <LibelleCard label={"Activité Physique"}></LibelleCard>
        <LibelleCard label={"Profession"}></LibelleCard>
        <LibelleCard label={"Tabac"}></LibelleCard>
        <LibelleCard label={"Alcool"}></LibelleCard>
        <LibelleCard label={"Stress"}></LibelleCard>
        <LibelleCard label={"Fast Food"}></LibelleCard>
        <LibelleCard label={"Chabbat"}></LibelleCard>
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

export default EatingHabits;
