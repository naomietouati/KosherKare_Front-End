import React from 'react';
import { View, Text, Button } from 'react-native';
import MultiSelectList from './multiSelectList';
import CheckBox from './checkBox';
import ImageButton from './imageButton';

const Question = ({ questionData, onAnswer, onNext }) => {
  if (!questionData) {
    return null;
  }

  const handleAnswer = (answer) => {
    onAnswer(questionData.id, answer);
  };

return (
    <View>
      <Text style={{ color: 'white' }}>{questionData.question}</Text>
      {questionData.type === "checkbox" && (
        <>
          <CheckBox label="Oui" onPress={() => handleAnswer('Oui')} />
          <CheckBox label="Non" onPress={() => onNext()} />
        </>
      )}
      {questionData.type === "multiselect" && (
        <>
          <Text>Boisson:</Text>
          <MultiSelectList values={['Café/chocolat chaud', 'Thé', 'Eau', 'Jus d\'orange']} onSelect={(selectedValues) => handleAnswer({ boisson: selectedValues })} />
          <Text>Mangé:</Text>
          <MultiSelectList values={['Pain', 'Brioche', 'Céréales', 'Fruit']} onSelect={(selectedValues) => handleAnswer({ mangé: selectedValues })} />
        </>
      )}
      {questionData.type === "imageButton" && (
        <>
          <ImageButton imageSource={require('../assets/icon.png')} onPress={(size) => handleAnswer({ portions: size })} />
        </>
      )}
    </View>
  );
};

export default Question;