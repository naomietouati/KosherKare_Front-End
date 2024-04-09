import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import questionsData from '../questionsData.json'; 
import MultiSelectList from './multiSelectList';
import CheckBox from './checkBox';
import ImageButton from './imageButton';
import Screen from './screen';

const Form = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState("1");
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questionsData.find(question => question.id === currentQuestionId);

  const handleAnswer = (questionId, response) => {
    setAnswers([...answers, { id: questionId, response: response }]);
  };

  const QuestionSuivante = () => {
    const index = questionsData.findIndex(question => question.id === currentQuestionId);
    const response = answers.find(answer => answer.id === currentQuestionId)?.response;
    const nextQuestionId = response === 'Oui' ? currentQuestion.nextStepIfYes : currentQuestion.nextStepIfNo;
    setCurrentQuestionId(nextQuestionId || questionsData[index + 1]?.id);
  };
  
  const QuestionPrecedente = () => {
    const index = questionsData.findIndex(question => question.id === currentQuestionId);
    setCurrentQuestionId(questionsData[index - 1]?.id);
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

  const envoyerReponsesAPI = async () => {
    try {
      // Envoyer les réponses à votre API ici
      const reponseAPI = await fetch('http://localhost:8080/EatingsHabits/initialization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (!reponseAPI.ok) {
        throw new Error('Erreur lors de l\'envoi des réponses à l\'API');
      }

      console.log('Réponses envoyées avec succès à l\'API');
    } catch (erreur) {
      console.error('Erreur lors de l\'envoi des réponses à l\'API:', erreur);
    }
  };

  return (
    <View>
      <Screen>
        {renderQuestion()}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Précédent" onPress={QuestionPrecedente} />
          <Button title="Suivant" onPress={QuestionSuivante} />
          <Button title="Envoyer réponses" onPress={envoyerReponsesAPI} />
        </View>
      </Screen>
    </View>
  );
};

export default Form;
