import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

export default function App() {
    
  return (
    <>
      <View style={styles.container}>
        <Text>Hello world</Text>
      </View>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})