import { uploadAsync } from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DetectionScreen({ route, navigation }) {
  // Get image from route params
  const { imageUri } = route.params;
  const [prediction, setPrediction] = useState([]);

  // Get safe area insets
  const insets = useSafeAreaInsets();

  // Model to database binding -- move to firestore
  const modelToDbBinding = {};

  useEffect(() => {
    const getPredictions = async () => {
      try {
        const response = await uploadAsync(
          "http:/192.168.1.204:4259/logo-detection",
          imageUri,
          {
            httpMethod: "POST",
            fieldName: "image",
            uploadType: FileSystemUploadType.MULTIPART,
          }
        );
        const data = JSON.parse(response.body);
        const processedData = data
          .sort(
            // Sort by confidence descending
            (a, b) => b.confidence - a.confidence
          )
          .filter(
            // Remove duplicates from model output
            (item, index) =>
              item.name in Object.keys(modelToDbBinding) &&
              data.indexOf(item) === index
          )
          .map(
            // Rebind model output to database names
            (item) => {
              return {
                name: modelToDbBinding[item.name],
                confidence: item.confidence,
              };
            }
          )
          .filter(
            // Remove duplicates from rebinding
            (item, index) =>
              item.name in Object.keys(modelToDbBinding) &&
              data.indexOf(item) === index
          );
        setPrediction(processedData);
        console.log("Request done:" + JSON.stringify(processedData));
      } catch (err) {
        console.error(err);
      }
    };
    getPredictions();
  }, []);

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
          source={{ uri: imageUri }}
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

        <View className="items-center justify-center">
          <Text className="text-2xl text-white">Loading...</Text>
          {prediction.length >= 3 ? prediction.slice(0, 3) : prediction}
        </View>
      </View>
    </View>
  );
}
