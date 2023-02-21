import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import CameraScreen from "./screens/CameraScreen";
import SearchScreen from "./screens/SearchScreen";
import RecentsScreen from "./screens/RecentsScreen";

// Screen names
const cameraName = "Camera";
const searchName = "Search";
const recentsName = "Recents";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={cameraName}
        screenOptions={
          // Tab bar styling
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let routeName = route.name;

              if (routeName === cameraName) {
                iconName = focused ? "camera" : "camera-outline";
              } else if (routeName === searchName) {
                iconName = focused ? "search" : "search-outline";
              } else if (routeName === recentsName) {
                iconName = focused ? "time" : "time-outline";
              }
              return <Ionicons name={iconName} size={size + 5} color={color} />;
            },
            tabBarActiveTintColor: "mediumseagreen",
            tabBarInactiveTintColor: "darkgrey",
            tabBarStyle: {
              height: 90,
              backgroundColor: "black",
              borderTopWidth: 0,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              marginTop: -10,
            },

            // Hide the header
            headerShown: false,
          })
        }
      >
        <Tab.Screen name={searchName} component={SearchScreen} />
        <Tab.Screen name={cameraName} component={CameraScreen} />
        <Tab.Screen name={recentsName} component={RecentsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
