import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import CameraScreen from './screens/CameraScreen';
import SearchScreen from './screens/SearchScreen';
import RecentsScreen from './screens/RecentsScreen';

// Screen names
const cameraName = 'Camera';
const searchName = 'Search';
const recentsName = 'Recents';

const Tab = createBottomTabNavigator();


export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={cameraName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if(routeName === cameraName) {
                        iconName = focused ? 'camera' : 'camera-outline'
                    }
                    else if(routeName === searchName) {
                        iconName = focused ? 'search' : 'search-outline'
                    }
                    else if(routeName === recentsName) {
                        iconName = focused ? 'time' : 'time-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'seagreen',
                tabBarInactiveTintColor: 'grey',
            })}>
            
            <Tab.Screen name={searchName} component={SearchScreen} />
            <Tab.Screen name={cameraName} component={CameraScreen} />
            <Tab.Screen name={recentsName} component={RecentsScreen} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}