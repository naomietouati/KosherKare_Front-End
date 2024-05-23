import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Screen from '../components/screen';
import InputField from './inputField';
import LoginButton from './loginButton';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Logo = () => (
  <View style={styles.logoContainer}>
    <Text style={styles.logoText}>KosherKare</Text>
  </View>
);

const SubText = () => (
  <Text style={styles.subText}>
    Manage your health effectively
  </Text>
);

const InscriptionPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleInscription = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await response.json();
      console.log('Réponse de l\'API :', data);
      // Traitez la réponse de l'API ici
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.message);
      // Affichez une erreur à l'utilisateur
    }
  };

  const validatePassword = (password) => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Le mot de passe doit contenir au moins 12 caractères';
    }
    if (!hasUpperCase) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    }
    if (!hasLowerCase) {
      return 'Le mot de passe doit contenir au moins une minuscule';
    }
    if (!hasNumber) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    }
    if (!hasSpecialChar) {
      return 'Le mot de passe doit contenir au moins un caractère spécial';
    }
    return '';
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Logo />
        <SubText />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <InputField placeholder="First Name" value={firstName} onChangeText={setFirstName} />
        <InputField placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        <InputField placeholder="Email Address" value={email} onChangeText={setEmail} />
        <InputField placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <LoginButton buttonText="S'inscrire" onPress={handleInscription} />
        <LoginButton buttonText="Se connecter" onPress={() => navigation.navigate('Login')} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
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
});

export default InscriptionPage;
