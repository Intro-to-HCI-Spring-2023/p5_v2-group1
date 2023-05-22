import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MenuProvider } from "react-native-popup-menu";
import Login from "./pages/Login";
import Onboard from "./pages/Onboard";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import { View, ScrollView, SafeAreaView, Text } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from "./constants";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const RequestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Request Screen</Text>
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
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarStyle: {
                      backgroundColor: COLORS.senary, 
                    },
                    tabBarLabelStyle: {
                      fontSize: 12,
                    },
                    tabBarInactiveTintColor: COLORS.octonary, // Set the inactive tab label color to gray
                    tabBarActiveTintColor: 'white', // Set the active tab label color to white
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                
                      if (route.name === 'Map') {
                        iconName = focused ? 'map' : 'map-outline';
                      } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                      } else if (route.name === 'Request') {
                        iconName = focused ? 'car' : 'car-outline';
                      }
                
                      // Return the appropriate icon component
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                  })}
                >
                <Tab.Screen name="Request" component={RequestScreen} options={{ headerTitle: "", headerTransparent: true }} />
                <Tab.Screen name="Map" options={{ headerTitle: "", headerTransparent: true }}>
                  {
                    () => 
                    <Map 
                      userType={route.params?.userType} 
                    />
                  }
                </Tab.Screen>
                <Tab.Screen name="Profile" options={{ headerTitle: "", headerTransparent: true }}>
                  {() => <Profile userType={route.params?.userType} />}
                </Tab.Screen>
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
