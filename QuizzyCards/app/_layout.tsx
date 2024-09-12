import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddFlashcard from "@/src/screens/AddFlashcard";
import Quiz from "../src/screens/Quiz";
import Score from "@/src/screens/Score";
const Stack = createStackNavigator();
// const _layout = () => {
function _layout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {/* <Stack.Screen name="AddFlashcard" component={AddFlashcard} /> */}
        <Stack.Screen
          name="AddFlashcards"
          component={AddFlashcard}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={{ headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default _layout;
