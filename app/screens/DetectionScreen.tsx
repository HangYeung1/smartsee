import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { selectCompanies } from "../redux/companiesSlice";
import { uploadAsync } from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function DetectionScreen({ route, navigation }) {
  // Get image from route params
  const { imageUri } = route.params;
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hooks
  const companies = useSelector(selectCompanies);

  // Get safe area insets
  const insets = useSafeAreaInsets();

  // Model to database binding -- move to firestore
  const modelToDbBinding = {
    adidas: "adidas AG",
    adidas1: "adidas AG",
    boeing: "The Boeing Company",
    boeing_text: "The Boeing Company",
    cocacola: "The Coca-Cola Company",
    coke: "The Coca-Cola Company",
    apple: "Apple Inc.",
  };

  useEffect(() => {
    const getPredictions = async () => {
      try {
        const response = await uploadAsync(
          "http:/192.168.1.205:4259/logo-detection",
          imageUri,
          {
            httpMethod: "POST",
            fieldName: "image",
            uploadType: FileSystemUploadType.MULTIPART,
          }
        );
        console.log("Request sent");
        const data = JSON.parse(response.body);
        let processedData = data
          .sort(
            // Sort by confidence descending
            (a, b) => b.confidence - a.confidence
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
            // Filter out companies that are not in the database
            (item) => item.name !== undefined
          );
        const companiesDetected = processedData.map((item) => item.name);
        processedData = processedData.filter(
          (item, index) => companiesDetected.indexOf(item.name) === index
        );
        console.log("Request done:" + JSON.stringify(processedData));
        if (processedData.length > 3) {
          processedData = processedData.slice(0, 3);
        }
        setPrediction(processedData);
        console.log("Saved detection:" + JSON.stringify(processedData));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    getPredictions();
  }, []);

  const confidenceColor = (confidence) => {
    if (confidence > 0.75) {
      return "green";
    } else if (confidence > 0.5) {
      return "orange";
    } else {
      return "red";
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
      <FocusAwareStatusBar style="light" />
      {/* Image */}
      <ImageBackground
        className="h-full w-full items-center justify-center"
        imageStyle={{ backgroundColor: "black", opacity: 0.75 }}
        source={{ uri: imageUri }}
      >
        {/* Close button */}
        <Pressable
          className="absolute left-6 top-6 h-12 w-12 items-center justify-center rounded-full bg-black/20"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={30} color="white" />
        </Pressable>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : prediction.length > 0 ? (
          prediction.map((item) => (
            <Pressable
              className="m-1 h-28 w-4/5 flex-row items-center rounded-3xl bg-gray-200 pl-7"
              key={item.name}
              onPress={() =>
                navigation.navigate("BreakdownScreen", {
                  company: companies.find(
                    (company) => company.name === item.name
                  ),
                })
              }
            >
              <Text className="mr-3 w-48 text-xl font-bold text-black">
                {item.name}
              </Text>
              <Text
                className="w-14 text-xl font-bold text-black"
                style={{ color: confidenceColor(item.confidence) }}
              >
                {(item.confidence * 100).toFixed(0) + "%"}
              </Text>
              <Ionicons name="chevron-forward" size={30} color="black" />
            </Pressable>
          ))
        ) : (
          <Pressable
            className="m-1 h-28 w-4/5 items-center justify-center rounded-3xl bg-gray-200"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-xl font-bold text-black">
              No companies detected
            </Text>
          </Pressable>
        )}
      </ImageBackground>
    </View>
  );
}
