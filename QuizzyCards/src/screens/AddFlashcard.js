import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddFlashcard({ Navigation }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const addCard = async () => {
    if (question != "" && answer != "") {
      const flashcard = { question, answer }; // Creates new Flashcard
      const storedFlashcards =
        JSON.parse(await AsyncStorage.getItem("flashcards")) || []; //This line will get the array of flashcards already present in the storage and will be assigned to flashcards array.
      storedFlashcards.push(flashcard); // This line will push the new flashcard to the array of already present flashcards.
      await AsyncStorage.setItem(
        "flashcards",
        JSON.stringify(storedFlashcards) // Converts the flashcards array data to JSON format
      );
      setQuestion(""); // These will clear the input fields

      setAnswer("");
    } else {
      alert("Please fill in both fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}> Add Flashcard </Text>
        <TextInput
          value={question}
          placeholder="Enter Question"
          onChangeText={setQuestion}
          style={styles.inputText}
          autoCapitalize="true"
        />
        <TextInput
          value={answer}
          placeholder="Enter Answer"
          onChangeText={setAnswer}
          style={styles.inputText}
        />
        <TouchableOpacity style={styles.button} onPress={addCard}>
          <Text style={{ color: "white", fontSize: 20 }}>AddCard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white", fontSize: 20 }}>StartQuiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  inputText: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#2196F3",
    // backgroundColor: "#4CAF50",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    marginTop: 15,
  },
});
