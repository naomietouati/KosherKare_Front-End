import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import questionsData from '../questionsData.json'; 
import MultiSelectList from './multiSelectList';
import CheckBox from './checkBox';
import ImageButton from './imageButton';
import Screen from './screen';

const Form = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questionsData[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'checkbox':
        return (
          <View>
            <Text style={{ color: 'white' }}>{currentQuestion.question}</Text>
            <CheckBox label="Oui" onPress={() => handleAnswer(currentQuestion.id, 'Oui')} />
            <CheckBox label="Non" onPress={() => handleAnswer(currentQuestion.id, 'Non')} />
          </View>
        );
      case 'multiselect':
        return (
          <View>
            <Text style={{ color: 'white' }}>{currentQuestion.question}</Text>
            <MultiSelectList
              values={currentQuestion.options}
              onSelect={selectedValues => handleAnswer(currentQuestion.id, { selectedValues })}
            />
          </View>
        );
      case 'imageButton':
        return (
          <View>
            <Text style={{ color: 'white' }}>{currentQuestion.question}</Text>
            <ImageButton
              imageSource={require('../assets/icon.png')}
              onPress={size => handleAnswer(currentQuestion.id, { size })}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <Screen>
        {renderQuestion()}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Précédent" onPress={handlePreviousQuestion} disabled={currentQuestionIndex === 0} />
          <Button title="Suivant" onPress={handleNextQuestion} disabled={currentQuestionIndex === questionsData.length - 1} />
        </View>
      </Screen>
    </View>
  );
};

export default Form;
