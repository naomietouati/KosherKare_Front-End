import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './components/accueil';
import EatingHabits from './components/eatingHabits';
import LoginScreen from './components/connexion';
import InscriptionPage from './components/inscription';
import Form from './components/form';
import QuestionComponent from './components/question';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Configurations des habitudes alimentaires"
            component={Form}
            />
         <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />  
     
        <Stack.Screen
          name="Inscription"
          component={InscriptionPage}
        />
         <Stack.Screen
          name="Accueil"
          component={Accueil}
        />
        <Stack.Screen
          name="EatingHabits"
          component={EatingHabits}
        />
          <Stack.Screen
          name="QuestionComponent"
          component={QuestionComponent}
        />

        {/*
        <Stack.Screen
          name="PhysicalActivity"
          component={PhysicalActivity}
          options={{ title: 'Activité Physique' }}
        />
        <Stack.Screen99
          name="Evolution"
          component={Evolution}
          options={{ title: 'Évolution' }}
        />
        <Stack.Screen
          name="Sleep"
          component={Sleep}
          options={{ title: 'Sommeil' }}
        />
        <Stack.Screen
          name="Notebook"
          component={Notebook}
          options={{ title: 'Carnet' }}
        />
        <Stack.Screen
          name="MealIdeas"
          component={MealIdeas}
          options={{ title: 'Idées Repas' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profil' }}
        />
        <Stack.Screen
          name="WeeklyMenu"
          component={WeeklyMenu}
          options={{ title: 'Menu de la Semaine' }}
        />
  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
