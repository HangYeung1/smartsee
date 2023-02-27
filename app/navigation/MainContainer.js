import * as React from "react";
import { Modal, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import SearchScreen from "./screens/SearchScreen";
import BreakdownScreen from "./screens/BreakdownScreen";

import CameraScreen from "./screens/CameraScreen";
import SettingsScreen from "./screens/SettingsScreen";

import SavedScreen from "./screens/SavedScreen";

// Screen tab names
const searchStackName = "SearchStack";
const cameraStackName = "CameraStack";
const savedStackName = "SavedStack";

// Search screen stack names
const searchName = "Search";
const breakdownName = "Breakdown";

// Camera screen stack names
const cameraName = "Camera";
const settingsName = "Settings";

// Saved screen stack names
const savedName = "Saved";

const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName={searchName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={searchName} component={SearchScreen} />
      <Stack.Screen
        name={breakdownName}
        component={BreakdownScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function CameraStack() {
  return (
    <Stack.Navigator
      initialRouteName={cameraName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={cameraName} component={CameraScreen} />
      <Stack.Screen
        name={settingsName}
        component={SettingsScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function SavedStack() {
  return (
    <Stack.Navigator
      initialRouteName={savedName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={savedName} component={SavedScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={cameraStackName}
        screenOptions={
          // Tab bar styling
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let routeName = route.name;

              if (routeName === cameraStackName) {
                iconName = focused ? "camera" : "camera-outline";
              } else if (routeName === searchStackName) {
                iconName = focused ? "search" : "search-outline";
              } else if (routeName === savedStackName) {
                iconName = focused ? "library" : "library-outline";
              }
              return <Ionicons name={iconName} size={size + 5} color={color} />;
            },
            tabBarLabel: ({ focused, color }) => {
              let label;
              let routeName = route.name;

              if (routeName === cameraStackName) {
                label = "Camera";
              } else if (routeName === searchStackName) {
                label = "Search";
              } else if (routeName === savedStackName) {
                label = "Saved";
              }
              return (
                <Text
                  style={{
                    color: color,
                    fontSize: 10,
                    marginTop: -10,
                    fontWeight: focused ? "bold" : "normal",
                  }}
                >
                  {label}
                </Text>
              );
            },
            tabBarStyle: {
              height: 90,
              backgroundColor: "black",
              borderTopWidth: 0,
            },
            tabBarActiveTintColor: "mediumseagreen",
            tabBarInactiveTintColor: "darkgrey",
            headerShown: false,
          })
        }
      >
        <Tab.Screen name={searchStackName} component={SearchStack} />
        <Tab.Screen name={cameraStackName} component={CameraStack} />
        <Tab.Screen name={savedStackName} component={SavedStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
