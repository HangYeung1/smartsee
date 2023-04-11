import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BreakdownScreen({ route, navigation }) {
  // Get safe area insets
  const insets: EdgeInsets = useSafeAreaInsets();

  // Get company data
  const { company } = route.params;
  const {
    name,
    industry,
    description,
    imageURL,
    esg,
    esgEnvironment,
    esgSocial,
    esgGovernance,
    controversy,
  } = company;

  // Calculate ESG level
  // 0-10 Negligible
  // 10-20 Low
  // 20-30 Moderate
  // 30-40 High
  // 40+ Severe

  let esgLevel: string;
  let esgColor: string;

  if (esg <= 10) {
    esgLevel = "Negligible";
    esgColor = "green";
  } else if (esg <= 20) {
    esgLevel = "Low";
    esgColor = "#fada5e";
  } else if (esg <= 30) {
    esgLevel = "Moderate";
    esgColor = "orange";
  } else if (esg <= 40) {
    esgLevel = "High";
    esgColor = "red";
  } else {
    esgLevel = "Severe";
    esgColor = "darkred";
  }

  // Calculate controversy level
  // 1: Low
  // 2: Moderate
  // 3: Significant
  // 4: High
  // 5: Severe

  let controversyLevel: string;
  let controversyColor: string;

  switch (controversy) {
    case 1:
      controversyLevel = "Low";
      controversyColor = "green";
      break;
    case 2:
      controversyLevel = "Moderate";
      controversyColor = "#fada5e";
      break;
    case 3:
      controversyLevel = "Significant";
      controversyColor = "orange";
      break;
    case 4:
      controversyLevel = "High";
      controversyColor = "red";
      break;
    case 5:
      controversyLevel = "Severe";
      controversyColor = "darkred";
      break;

    default:
      controversyLevel = "Unknown";
      controversyColor = "gray";
      break;
  }

  return (
    <View
      className="flex-1"
      style={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar style="light" />

      {/* Company Image */}
      <View className="h-2/5 w-full items-center justify-center backdrop-blur-lg">
        <Image
          className="h-4/5 w-4/5"
          source={{ uri: imageURL }}
          style={{ resizeMode: "contain" }}
          blurRadius={1}
        />
      </View>

      {/* Gradient Overlay */}
      <LinearGradient
        className="absolute h-2/5 w-full"
        colors={[
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,0.45)",
          "rgba(0,0,0,0.3375)",
          "rgba(0,0,0,0.253)",
          "rgba(0,0,0,0.189)",
          "rgba(0,0,0,0.142)",
          "rgba(0,0,0,0.107)",
          "rgba(0,0,0,0.08)",
          "rgba(0,0,0,0.06)",
          "rgba(0,0,0,0.045)",
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.0125)",
          "rgba(0,0,0,0.025)",
          "rgba(0,0,0,0.05)",
          "rgba(0,0,0,0.1)",
          "rgba(0,0,0,0.2)",
        ]}
        locations={[
          0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.7, 0.75,
          0.8, 0.85, 0.9, 0.95, 1,
        ]}
      />

      {/* Back Button */}
      <Pressable
        className="absolute left-5"
        style={{ top: insets.top + 30 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={35} color="white" />
      </Pressable>

      {/* Company Info */}
      <View className="-mt-6 flex-1  rounded-3xl bg-white px-7 pt-7" style={{}}>
        {/* Header */}
        <View className="mb-2.5 flex-row items-center justify-between">
          {/* Company Name and Category */}
          <View>
            <Text className="text-sm font-bold text-gray-500">{industry}</Text>
            <Text className="text-3xl font-bold">{name}</Text>
          </View>

          {/* Bookmark Button */}
          <Pressable>
            <Ionicons name="bookmark-outline" size={30} color="black" />
          </Pressable>
        </View>

        {/* Tags */}
        <Text className="text-sm text-gray-500">
          {esgLevel + " ESG Risk • " + controversyLevel + " Controversy"}
        </Text>

        {/* Detail Breakdown */}
        <View className="my-4 flex-row">
          {/* Icon */}
          <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Ionicons name="analytics-outline" size={30} color={esgColor} />
          </View>

          {/* Text */}
          <View className="ml-3.5">
            <Text className="text-xl font-bold">ESG Risk: {esg}</Text>
            <Text
              className="text-ellipsis pr-12 text-gray-500"
              numberOfLines={3}
            >
              {description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
