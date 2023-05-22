import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MenuProvider } from "react-native-popup-menu";
import Login from "./pages/Login";
import Onboard from "./pages/Onboard";
import Map from "./pages/Map";
import { View, ScrollView, SafeAreaView, Text } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from "react-native";

import { COLORS } from "./constants";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const App = () => {
  return (
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

          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{
              headerStyle: {
                  backgroundColor: COLORS.quinary,
              },
              headerShadowVisible: false,
              headerTitle: ""
            }}
          />

          <Stack.Screen
            name="Home"
            options={{
              headerStyle: {
                backgroundColor: COLORS.senary,
              },
              headerShadowVisible: true,
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerTitle: "WeDrive",
            }}
          >
            {({ route }) => (
              <Tab.Navigator>
                <Tab.Screen name="Map" options={{ headerTitle: "", headerTransparent: true }}>
                  {
                    () => 
                    <Map 
                      userType={route.params?.userType} 
                    />
                  }
                </Tab.Screen>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: "", headerTransparent: true }} />
              </Tab.Navigator>
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
