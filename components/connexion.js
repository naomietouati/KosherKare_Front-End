import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import Screen from '../components/screen';
import InputField from './inputField';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ImageComponent = ({ image }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: image || 'https://assets.api.uizard.io/api/cdn/stream/42f49432-3453-486b-9a72-3ac6d4bf79e5.png' }}
        style={styles.image}
      />
    </View>
  );
};

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>KosherKare</Text>
    </View>
  );
};

const SubText = () => {
  return (
    <Text style={styles.subText}>
      Manage your health effectively
    </Text>
  );
};

const ForgotPasswordText = () => {
  return (
    <TouchableOpacity style={styles.forgotPasswordContainer}>
      <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
    </TouchableOpacity>
  );
};

const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      <Text style={styles.loginButtonText}>Se connecter</Text>
    </TouchableOpacity>
  );
};

const SignupText = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.signupContainer} onPress={onPress}>
      <Text style={styles.signupText}>Vous n'avez pas de compte ? Inscrivez-vous</Text>
    </TouchableOpacity>
  );
};

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('@KosherKare:token');
        if (token) {
          const response = await fetch('https://sleepy-spire-97484-af451f5eda35.herokuapp.com/user/check-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              if (data.hasEatingHabits) {
                navigation.navigate('Accueil');
              } else {
                navigation.navigate('Form');
              }
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://sleepy-spire-97484-af451f5eda35.herokuapp.com/user/connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await response.json();
      if (data.code === 200 && data.success) {
        await AsyncStorage.setItem('@KosherKare:token', data.token);
        if (data.hasEatingHabits) {
          navigation.navigate('Accueil');
        } else {
          navigation.navigate('Form');
        }
      } else {
        Alert.alert('Erreur', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <Screen>
      <ImageComponent />
      <Logo />
      <SubText />
      <InputField placeholder="Email Address" value={username} onChangeText={setUsername} />
      <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <ForgotPasswordText />
      <LoginButton onPress={handleLogin} />
      <SignupText onPress={() => navigation.navigate('Inscription')} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: height * 0.04,
  },
  logoText: {
    color: '#ffffff',
    fontSize: width * 0.08,
    fontFamily: 'Arial',
    fontWeight: '700',
    lineHeight: width * 0.1,
  },
  subText: {
    color: '#ffffff',
    fontSize: width * 0.04,
    fontFamily: 'Arial',
    marginBottom: height * 0.04,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: height * 0.03,
  },
  forgotPasswordText: {
    color: '#ffffff',
    fontSize: width * 0.03,
    fontFamily: 'Arial',
  },
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
  signupContainer: {
    marginTop: height * 0.04,
  },
  signupText: {
    color: '#ffffff',
    fontSize: width * 0.035,
    fontFamily: 'Arial',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    overflow: 'hidden',
    marginBottom: height * 0.05,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default LoginScreen;
