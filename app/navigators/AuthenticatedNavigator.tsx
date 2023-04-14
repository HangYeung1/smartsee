import { fetchCompanies, selectCompanies } from "../redux/companiesSlice";
import { AppDispatch } from "../redux/store";
import { fetchCollections } from "../redux/userSlice";
import BreakdownScreen from "../screens/BreakdownScreen";
import CameraScreen from "../screens/CameraScreen";
import DetectionScreen from "../screens/DetectionScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SearchScreen from "../screens/SearchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Screen tab names
const searchStackName: string = "SearchStack";
const cameraStackName: string = "CameraStack";
const libraryStackName: string = "LibraryStack";

// Screen names
const searchName: string = "SearchScreen";
const breakdownName: string = "BreakdownScreen";
const cameraName: string = "CameraScreen";
const detectionName: string = "DetectionScreen";
const libraryName: string = "LibraryScreen";

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
      <Stack.Screen name={breakdownName} component={BreakdownScreen} />
      <Stack.Screen
        name={detectionName}
        options={{ gestureEnabled: false, animationEnabled: false }}
        component={DetectionScreen}
      />
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

export default function AuthenticatedNavigator() {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector(selectCompanies);

  // Fetch companies and collections
  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchCollections());
  }, []);

  // Calculate just updated
  useEffect(() => {
    dispatch({
      type: "user/setJustUpdated",
      payload: companies
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 10)
        .map((company) => company.id),
    });
    console.log("Just updated: Updated");
  }, [companies]);

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

            if (!focused) {
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
