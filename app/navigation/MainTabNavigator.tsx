import BreakdownScreen from "../screens/Breakdown";
import CameraScreen from "../screens/Camera";
import LibraryScreen from "../screens/Library";
import SearchScreen from "../screens/Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screen tab names
const searchStackName: string = "SearchStack";
const cameraStackName: string = "CameraStack";
const libraryStackName: string = "LibraryStack";

// Search screen stack names
const searchName: string = "Search";
const breakdownName: string = "Breakdown";

// Camera screen stack names
const cameraName: string = "Camera";

// Library screen stack names
const libraryName: string = "Library";

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
            let routeName: string = route.name;
            let iconName: string;

            switch (routeName) {
              case searchStackName:
                iconName = "search";
                break;
              case cameraStackName:
                iconName = "camera";
                break;
              case libraryStackName:
                iconName = "library";
                break;
              default:
                iconName = "bug";
                break;
            }

            if (focused) {
              iconName = iconName.concat("-outline");
            }

            return <Ionicons name={iconName} size={size + 5} color={color} />;
          },
          // Tab bar labels
          tabBarLabel: ({ focused, color }) => {
            let routeName: string = route.name;
            let label: string;

            switch (routeName) {
              case searchStackName:
                label = "Search";
                break;
              case cameraStackName:
                label = "Camera";
                break;
              case libraryStackName:
                label = "Library";
                break;
              default:
                label = "Error";
                break;
            }

            return (
              <Text
                className="-mt-2.5 text-[10px]"
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
