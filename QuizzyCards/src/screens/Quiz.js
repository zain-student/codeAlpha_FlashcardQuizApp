import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";

const Quiz = ({ navigation }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [enteredAnswer, setEnteredAnswer] = useState("");
  const [questionNo, setQuestionNo] = useState(1);

  useEffect(() => {
    const getFlashcards = async () => {
      const storedFlashcards =
        JSON.parse(await AsyncStorage.getItem("flashcards")) || [];
      setFlashcards(storedFlashcards);
    };
    getFlashcards();
  }, []);
  const submit = () => {
    if (enteredAnswer === "") {
      ToastAndroid.show("Please enter an answer", ToastAndroid.SHORT);
      return;
    } else {
      if (
        enteredAnswer.toLowerCase() ===
        flashcards[currentQuestion].answer.toLowerCase()
      ) {
        // alert("True");
        setScore(score + 1);
      }
    }
    setEnteredAnswer("");
    if (currentQuestion < flashcards.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setQuestionNo((prevQuestionNo) => prevQuestionNo + 1);
    } else {
      ToastAndroid.show("Quiz Completed", ToastAndroid.SHORT);
      // navigation.navigate("QuizResult", { score: score });
    }
    // nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion < flashcards.length - 1) {
      setEnteredAnswer("");
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setQuestionNo((prevQuestionNo) => prevQuestionNo + 1);
    } else {
      ToastAndroid.show("Quiz Finished", ToastAndroid.SHORT);
    }
  };
  const quizResult = () => {
    // if (enteredAnswer < flashcards.length - 1) {
    //   ToastAndroid.show("Please answer all questions", ToastAndroid.SHORT);
    //   return;
    // }
    // {
    navigation.navigate("Score", { score, questionNo }); // Pass the score when quiz is finished
    // }
  };
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
      setQuestionNo((prevQuestionNo) => prevQuestionNo - 1);
    } else {
      ToastAndroid.show("No Previous Question", ToastAndroid.SHORT);
    }
  };

  const viewAnswer = () => {
    setShowAnswer(true);
  };

  const hideAnswer = () => {
    setShowAnswer(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            width: "114%",
            height: 40,
            borderBottomWidth: 1,
            backgroundColor: "#2196F3",
            marginTop: -20,
            marginBottom: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            alignItems: "center",
          }}>
          {flashcards.length === 0 ? (
            <Text> </Text>
          ) : (
            <>
              <Text style={{ color: "white", fontSize: 30 }}>
                QUESTION:{questionNo}
              </Text>
            </>
          )}
        </View>

        {flashcards.length > 0 && currentQuestion < flashcards.length ? (
          <>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Your Quiz </Text>
            <Text style={styles.question}>
              {flashcards[currentQuestion].question} ?
            </Text>
            <TextInput
              placeholder="Enter Your Answer"
              value={enteredAnswer}
              onChangeText={setEnteredAnswer}
              style={styles.inputText}
            />

            <Text style={styles.answer}>
              {showAnswer ? flashcards[currentQuestion].answer : ""}
            </Text>
            <TouchableOpacity style={styles.submit} onPress={submit}>
              <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button1} onPress={viewAnswer}>
                <Text style={{ color: "white", fontSize: 20 }}>Show</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={hideAnswer}>
                <Text style={{ color: "white", fontSize: 20 }}>Hide</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={previousQuestion}>
                <Text style={{ color: "white", fontSize: 20 }}>{" << "}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quizResult} onPress={quizResult}>
                <Text style={{ color: "white", fontSize: 20 }}>QuizResult</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={nextQuestion}>
                <Text style={{ color: "white", fontSize: 20 }}>{" >> "}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            No questions available! {"\n"}Please Enter Questions first
          </Text>
        )}
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  // Styles remain unchanged
  container: {
    backgroundColor: "#3A4F50",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  card: {
    backgroundColor: "#0EF6CC",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  question: {
    fontSize: 25,
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  inputText: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  answer: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  submit: {
    width: "100%",
    height: 40,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    marginTop: 40,
  },
  showAnswer: {
    width: "100%",
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    marginTop: 10,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 10,
    height: 40,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button1: {
    width: "40%",
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  button2: {
    width: "40%",
    height: 40,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  quizResult: {
    width: "40%",
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  button: {
    width: "20%",
    height: 30,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
});
