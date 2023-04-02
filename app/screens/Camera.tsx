import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CameraScreen({ navigation }) {
  // Camera state
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera>(null);

  const [type, setType] = useState(CameraType.back);

  // Get safe area insets
  const insets = useSafeAreaInsets();

  // Request camera permissions when screen is loaded
  useEffect(() => {
    requestPermission();
  }, []);

  // If camera permissions are not granted, ask for them
  if (!permission) {
    return <View />;
  }

  if (permission.granted === false) {
    return (
      <View className="flex-1">
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center bg-white">
          <Pressable
            className="h-12 w-72 items-center justify-center rounded-full bg-gray-100"
            onPress={requestPermission}
          >
            <Text className="text-center text-xl text-blue-500">
              Grant Camera Permissions
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Toggle camera type
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // Open meida library
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });
    if (!result.canceled) {
      navigation.navigate("Detection", { image: result.assets[0].uri });
    }
  };

  // Take a picture
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({ quality: 1 });
      navigation.navigate("Detection", { image: data.uri });
    }
  };

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
      <Camera className="flex-1" type={type} ref={(ref) => setCamera(ref)}>
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
            <Pressable
              className="h-12 w-12 items-center justify-center rounded-full bg-black/20"
              onPress={pickImageAsync}
            >
              <Ionicons name="images-outline" size={30} color="white" />
            </Pressable>

            <Pressable
              className="h-24 w-24 items-center justify-center rounded-full bg-black/20"
              onPress={takePicture}
            >
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
