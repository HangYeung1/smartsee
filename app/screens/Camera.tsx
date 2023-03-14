import { Camera, CameraType } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CameraScreen({ navigation }) {
  // Camera state
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Get safe area insets
  const insets = useSafeAreaInsets();

  if (!permission) {
    return <View />;
  }

  // Camera permissions are not granted yet
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center">
          To use this app, you need to grant camera permissions.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Toggle camera type
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

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

      {/* Camera */}
      <Camera className="flex-1" type={type}>
        {/* Buttons Overlay */}
        <View className="flex-1 justify-between">
          {/* Top Buttons */}
          <View className="items-end p-6">
            <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-black/20">
              <Ionicons name="settings-outline" size={30} color="white" />
            </Pressable>
          </View>

          {/* Bottom Buttons */}
          <View className="mb-12 flex-row items-center justify-evenly">
            <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-black/20">
              <Ionicons name="images-outline" size={30} color="white" />
            </Pressable>

            <Pressable className="h-24 w-24 items-center justify-center rounded-full bg-black/20">
              <View className="h-20 w-20 rounded-full border-8 border-white" />
            </Pressable>

            <Pressable
              className="h-12 w-12 items-center justify-center rounded-full bg-black/20"
              onPress={toggleCameraType}
            >
              <Ionicons name="camera-reverse-outline" size={35} color="white" />
            </Pressable>
          </View>
        </View>
      </Camera>
    </View>
  );
}
