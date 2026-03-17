import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import AllPlaces from "./screens/AllPlaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700}
        }} >
          <Stack.Screen component={AllPlaces} name="All Places" options={({ navigation }) => (
            {
              title: 'Your Fav Places',
              headerRight: ({ tintColor }) => <IconButton name="add" size={24} color={tintColor}
                onPress={() => navigation.navigate("AddPlace")} />
            }
          )} />
          <Stack.Screen component={AddPlace} name="AddPlace" options={{
            title: 'Add a new Place'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )

}

const styles = StyleSheet.create({

})