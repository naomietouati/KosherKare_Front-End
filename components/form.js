import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import questionsData from '../questionsData.json'; 
import MultiSelectList from './multiSelectList';
import CheckBox from './checkBox';
import ImageButton from './imageButton';
import NumberInput from './numberInput';
import Screen from './screen';

const Form = ({ navigation }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState("1");
  const [answers, setAnswers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questionsData.find(question => question.id === currentQuestionId);

  const handleAnswer = (question, response) => {
    const updatedAnswers = answers.filter(answer => answer.question.id !== question.id);
    setAnswers([...updatedAnswers, { question: question, response: response }]);
  };

  const getCurrentResponse = () => {
    const answer = answers.find(answer => answer.question.id === currentQuestionId);
    return answer ? answer.response : 0;
  };

  const QuestionSuivante = () => {
    const index = questionsData.findIndex(question => question.id === currentQuestionId);
    const response = answers.find(answer => answer.question.id === currentQuestionId)?.response;
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
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <CheckBox
              label="Oui"
              isChecked={selectedOption === 'Oui'}
              onPress={() => {
                setSelectedOption('Oui');
                handleAnswer(currentQuestion, 'Oui');
              }}
            />
            <CheckBox
              label="Non"
              isChecked={selectedOption === 'Non'}
              onPress={() => {
                setSelectedOption('Non');
                handleAnswer(currentQuestion, 'Non');
              }}
            />
          </View>
        );
      case 'multiselect':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <MultiSelectList
              values={currentQuestion.options}
              onSelect={selectedValues => handleAnswer(currentQuestion, { selectedValues })}
            />
          </View>
        );
      case 'imageButton':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.imageButtonContainer}>
              {currentQuestion.options.map((option) => (
                <ImageButton
                  key={option.label}
                  imageSource={{ uri: option.image }}
                  onPress={() => {
                    handleAnswer(currentQuestion, option.label);
                    setSelectedImage(option.label);
                  }}
                  isSelected={selectedImage === option.label}
                />
              ))}
            </View>
          </View>
        );
      case 'numberInput':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <NumberInput
              value={getCurrentResponse()}
              onIncrease={() => handleAnswer(currentQuestion, getCurrentResponse() + 1)}
              onDecrease={() => handleAnswer(currentQuestion, Math.max(0, getCurrentResponse() - 1))}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        {currentQuestionId > 1 && <Button title="Précédent" onPress={QuestionPrecedente} />}
        {currentQuestion.nextStepIfYes !== 'end' && <Button title="Suivant" onPress={QuestionSuivante} />}
        {currentQuestion.nextStepIfYes === 'end' && <Button title="Envoyer" onPress={envoyerReponsesAPI} />}
      </View>
    );
  };

  const tokenEncoded = localStorage.getItem('@KosherKare:token');
  const token = decodeURIComponent(tokenEncoded);

  const envoyerReponsesAPI = async () => {
    try {
      const reponseAPI = await fetch('https://sleepy-spire-97484-af451f5eda35.herokuapp.com/EatingsHabits/initialization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, 
        },
        body: JSON.stringify(answers),
      });

      if (!reponseAPI.ok) {
        throw new Error('Erreur lors de l\'envoi des réponses à l\'API');
      }

      console.log('Réponses envoyées avec succès à l\'API');
      navigation.navigate('Accueil'); 
    } catch (erreur) {
      console.error('Erreur lors de l\'envoi des réponses à l\'API:', erreur);
    }
  };

  return (
    <View style={styles.container}>
      <Screen>
        {renderQuestion()}
        {renderButton()}
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  questionContainer: {
    marginVertical: 20,
  },
  questionText: {
    color: 'white',
    marginBottom: 20,
  },
  imageButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Form;
