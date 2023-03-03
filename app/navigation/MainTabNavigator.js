import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import SearchScreen from "../screens/Search";
import BreakdownScreen from "../screens/Breakdown";

import CameraScreen from "../screens/Camera";

import LibraryScreen from "../screens/Library";

// Screen tab names
const searchStackName = "SearchStack";
const cameraStackName = "CameraStack";
const libraryStackName = "LibraryStack";

// Search screen stack names
const searchName = "Search";
const breakdownName = "Breakdown";

// Camera screen stack names
const cameraName = "Camera";

// Library screen stack names
const libraryName = "Library";

const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName={searchName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={searchName} component={SearchScreen} />
      <Stack.Screen name={breakdownName} component={BreakdownScreen} />
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
    </Stack.Navigator>
  );
}

function LibraryStack() {
  return (
    <Stack.Navigator
      initialRouteName={libraryName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={libraryName} component={LibraryScreen} />
      <Stack.Screen name={breakdownName} component={BreakdownScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={cameraStackName}
        screenOptions={({ route }) => ({
          // Tab bar icons
          tabBarIcon: ({ focused, color, size }) => {
            let routeName = route.name;
            let iconName;

            if (routeName === cameraStackName) {
              iconName = focused ? "camera" : "camera-outline";
            } else if (routeName === searchStackName) {
              iconName = focused ? "search" : "search-outline";
            } else if (routeName === libraryStackName) {
              iconName = focused ? "library" : "library-outline";
            }
            return <Ionicons name={iconName} size={size + 5} color={color} />;
          },
          // Tab bar labels
          tabBarLabel: ({ focused, color }) => {
            let routeName = route.name;
            let label;

            if (routeName === cameraStackName) {
              label = "Camera";
            } else if (routeName === searchStackName) {
              label = "Search";
            } else if (routeName === libraryStackName) {
              label = "Library";
            }
            return (
              <Text
                className="text-[10px] -mt-2.5"
                style={{
                  color: color,
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
        })}
      >
        <Tab.Screen name={searchStackName} component={SearchStack} />
        <Tab.Screen name={cameraStackName} component={CameraStack} />
        <Tab.Screen name={libraryStackName} component={LibraryStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
