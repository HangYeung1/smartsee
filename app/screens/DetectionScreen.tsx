import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DetectionScreen({ route, navigation }) {
  // Get image from route params
  const { image } = route.params;

  // Get safe area insets
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-black"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar style="light" />
      <View className="flex-1">
        {/* Image */}
        <Image
          className="absolute h-full w-full"
          style={{ resizeMode: "contain" }}
          source={{ uri: image }}
        />

        {/* Close button */}
        <View className="items-start p-6">
          <Pressable
            className="h-12 w-12 items-center justify-center rounded-full bg-black/20"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={30} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
