import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EatingHabits from './components/eatingHabits';
import InscriptionPage from './components/inscription';
import LoginScreen from './components/connexion';

export default function App() {
  return (
    <View>
      <InscriptionPage></InscriptionPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});
