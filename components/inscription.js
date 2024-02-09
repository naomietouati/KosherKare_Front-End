import React, { useState } from 'react';
import { View } from 'react-native';
import Screen from './screen';
import InputField from './inputField';
import LoginButton from './loginButton';
import Title from './title';

const InscriptionPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleInscription = async () => {
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
      console.log(firstName,lastName,email)
  
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
  
  return (
    <View>
      <Screen>
        <Title text="Inscription" />
        <InputField placeholder="First Name" value={firstName} onChangeText={setFirstName} />
        <InputField placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        <InputField placeholder="Email Address" value={email} onChangeText={setEmail} />
        <InputField placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <LoginButton buttonText="S'inscrire" onPress={handleInscription} />
      </Screen>
    </View>
  );
};

export default InscriptionPage;
