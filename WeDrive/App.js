import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MenuProvider } from "react-native-popup-menu";
import Login from "./pages/Login";
import { View, ScrollView, SafeAreaView, Text } from "react-native";

import { COLORS } from "./constants";

const Stack = createStackNavigator();

const App = () => {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
              headerStyle: {
                  backgroundColor: COLORS.secondary,
              },
              headerShadowVisible: false,
              headerTitle: ""
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
