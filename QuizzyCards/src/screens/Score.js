import React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Fireworks, Stars } from "react-native-fiesta";

const Score = ({ route, navigation }) => {
  const { score, questionNo } = route.params;

  const restart = () => {
    navigation.navigate("AddFlashcards");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Finished!</Text>
      <View style={styles.scoreView}>
        <Text style={{ color: "white", fontSize: 30, marginBottom: 20 }}>
          {score > questionNo / 2
            ? "Congratulations!!!"
            : "Better Luck! Next Time"}
        </Text>
        <Text style={styles.score}>
          You Got: {score} OutOf: {questionNo}
        </Text>
      </View>
      <TouchableOpacity style={styles.restart} onPress={restart}>
        <Text style={{ color: "white", fontSize: 20 }}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A4F50",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -80,
    marginBottom: 100,
    color: "#fff",
  },
  scoreView: {
    backgroundColor: "#020",
    height: "40%",
    width: "90%",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderRadius: 30,
    borderStyle: "dashed",
  },
  score: {
    fontSize: 30,
    marginBottom: 30,
    color: "#0EF6CC",
  },
  restart: {
    width: "80%",
    height: 40,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    marginTop: 20,
  },
});
