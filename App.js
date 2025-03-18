import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './screens/home';
import Form from './screens/form';
import Profile from './screens/profile';
import EatingHabits from './screens/eatingHabits';
import Registration from './screens/registration';
import Login from './screens/login';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const SplashScreen = () => {
  const [rotateAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.3));
  
  useEffect(() => {
    // Animation de rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    
    // Animation de fondu et d'échelle
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  return (
    <View style={styles.splashContainer}>
      <LinearGradient
        colors={['#121212', '#1a1a1a', '#121212']}
        style={styles.background}
      />
      <Animated.View 
        style={[
          styles.logoWrapper, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Animated.Text 
          style={[
            styles.logoText,
            { transform: [{ rotate: spin }] }
          ]}
        >
          BetherWell
        </Animated.Text>
        <View style={styles.logoLine} />
      </Animated.View>
      <Animated.View 
        style={[
          styles.taglineContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })}]
          }
        ]}
      >
        <Text style={styles.taglineText}>Manage your health effectively</Text>
      </Animated.View>
    </View>
  );
};

const MyStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    // Fonction pour vérifier si l'utilisateur a une session active
    const checkUserSession = async () => {
      try {
        // Simuler un délai pour montrer l'écran de démarrage plus longtemps
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const token = await AsyncStorage.getItem('@KosherKare:token');
        
        if (token) {
          try {
            // L'endpoint connection nécessite un corps, même vide
            const response = await fetch('http://localhost:8080/user/connection', {
              method: 'POST',  // Méthode POST pour connection
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
              },
              body: JSON.stringify({}),  // Corps vide mais nécessaire
            });
            
            if (response.ok) {
              const data = await response.json();
              
              if (data.success) {
                // Déterminer la redirection en fonction de hasEatingHabits
                const route = data.hasEatingHabits ? 'Home' : 'Form';
                setInitialRoute(route);
              } else {
                // Token expiré, le supprimer
                await AsyncStorage.removeItem('@KosherKare:token');
              }
            } else {
              // En cas d'erreur, supprimer le token
              await AsyncStorage.removeItem('@KosherKare:token');
            }
          } catch (fetchError) {
            // En cas d'erreur de connexion, on supprime le token pour éviter des problèmes
            await AsyncStorage.removeItem('@KosherKare:token');
          }
        }
        
        // Une fois la vérification terminée, désactiver l'indicateur de chargement
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Registration" 
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EatingHabits" 
          component={EatingHabits}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Form" 
          component={Form}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: width * 0.1,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(21, 230, 57, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  logoLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  taglineContainer: {
    marginTop: 20,
  },
  taglineText: {
    color: '#e0e0e0',
    fontSize: width * 0.04,
    opacity: 0.8,
    letterSpacing: 0.5,
  }
});

export default MyStack;
