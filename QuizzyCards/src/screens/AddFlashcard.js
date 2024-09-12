import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddFlashcard({ navigation }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(1);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const addCard = async () => {
    setLoader1(true);
    if (question != "" && answer != "") {
      const flashcard = { question, answer }; // Creates new Flashcard
      const storedFlashcards =
        JSON.parse(await AsyncStorage.getItem("flashcards")) || []; //This line will get the array of flashcards already present in the storage and will be assigned to flashcards array.
      storedFlashcards.push(flashcard); // This line will push the new flashcard to the array of already present flashcards.
      await AsyncStorage.setItem(
        "flashcards",
        JSON.stringify(storedFlashcards) // Converts the flashcards array data to JSON format
      );
      setCount(count + 1);
      setLoader1(false);
      setQuestion(""); // These will clear the input fields

      setAnswer("");
    } else {
      alert("Please fill in both fields");
      setLoader1(false);
    }
  };

  const resetData = () => {
    Alert.alert("Warning!", "All the data will be deleted!", [
      {
        text: "Cancel",

        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          AsyncStorage.removeItem("flashcards");
          ToastAndroid.show(
            "Data Removed Successfully ",
            ToastAndroid.showWithGravity
          );
          setCount(1);
        },
      },
    ]);
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
          <Text style={{ color: "white", fontSize: 30 }}>
            QUESTION: {count}
          </Text>
        </View>
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
        <TouchableOpacity style={styles.button1} onPress={addCard}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {loader1 ? (
              <ActivityIndicator
                size="large"
                // color="#2196F3"
                color="white"
                // animating={loader}
              />
            ) : (
              "AddCard"
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoader2(true);
            navigation.navigate("Quiz");
            setLoader2(false);
          }}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {loader2 ? (
              <ActivityIndicator
                size="large"
                // color="#2196F3"
                color="white"
                // animating={loader}
              />
            ) : (
              "StartQuiz"
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetData}>
          <Text style={{ color: "white", fontSize: 20 }}>Reset Data</Text>
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
    // height: "95%",
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
  button1: {
    width: "100%",
    height: 40,
    backgroundColor: "#2196F3",
    // backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    marginTop: 70,
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
    marginTop: 10,
  },
  resetButton: {
    width: "40%",

    height: 40,
    backgroundColor: "red",
    marginTop: 10,
    marginBottom: -5,
    // backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
});
