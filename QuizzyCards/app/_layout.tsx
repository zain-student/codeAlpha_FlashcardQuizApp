import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddFlashcard from "../src/screens/AddFlashcard";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default _layout;
