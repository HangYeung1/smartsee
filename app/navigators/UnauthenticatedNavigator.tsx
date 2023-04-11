import AuthenticationScreen from "../screens/AuthenticationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const authenticationName: string = "Authentication";

const Stack = createStackNavigator();

export default function UnauthenticatedNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authenticationName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={authenticationName}
          component={AuthenticationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
