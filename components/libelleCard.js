import React from 'react';
import { View, Text, StyleSheet, Switch as NativeSwitch } from 'react-native'; // Importez Switch depuis 'react-native'

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', // Pour aligner le texte et le switch horizontalement
    alignItems: 'center', // Pour aligner le contenu verticalement
    marginVertical: 5, // Espace entre chaque LibelleCard
  },
  card: {
    width: 207,
    height: 25,
    backgroundColor: '#323232',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
  },
});

const LibelleCard = ({ label }) => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState); 
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <NativeSwitch
        trackColor={{ false: '#323232', true: '#323232' }} 
        thumbColor={isEnabled ? '#15e639' : '#ffffff'} 
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default LibelleCard;
