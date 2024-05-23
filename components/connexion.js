import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, setState } from 'react-native';
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

const SignupText = () => {
  return (
    <TouchableOpacity style={styles.signupContainer}>
      <Text style={styles.signupText}>Vous n'avez pas de compte ? Inscrivez-vous</Text>
    </TouchableOpacity>
  );
};
_storeData = async () => {
  
};

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log(JSON.stringify({
      username,
      password,
    }));
    try {
      const response = await fetch('http://localhost:8080/user/connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }
  
      // Réponse de l'API
      const data = await response.json();
      console.log('Réponse de l\'API:', data);
  
      // Rediriger uniquement si la réponse de l'API indique une connexion réussie
      if (data.code === 200 && data.success === true) {
        await AsyncStorage.setItem('@KosherKare:token', data.token);
        if (data.has_eating_habits) {
            navigation.navigate('Form');
        } else {
            navigation.navigate('Accueil');
        }
    } else {
        console.log(data.message);
    }
  } catch (error) {
      console.error(error);
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
      <SignupText />
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
  inputContainer: {
    marginBottom: height * 0.03,
    width: '80%',
  },
  input: {
    backgroundColor: '#121212',
    color: '#ffffff',
    fontSize: width * 0.04,
    fontFamily: 'Arial',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#323232',
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
