import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { AppDispatch } from "../redux/store";
import {
  postBookmarks,
  postRecents,
  selectBookmarks,
} from "../redux/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View, ScrollView } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

export default function BreakdownScreen({ route, navigation }) {
  // Get safe area insets
  const insets: EdgeInsets = useSafeAreaInsets();

  // Check if company is bookmarked
  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector(selectBookmarks);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  let bookmarked: boolean = bookmarks.includes(route.params.company.id);

  // Add company to recents
  useEffect(() => {
    dispatch(postRecents(route.params.company.id));
  }, []);

  // Get company data
  const {
    id,
    name,
    industry,
    description,
    imageURL,
    esg,
    esgEnvironment,
    esgSocial,
    esgGovernance,
    controversy,
    lastUpdated,
  } = route.params.company;

  // Calculate ESG level
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

  const scoreColor = (score: number): string => {
    if (score <= 2.5) {
      return "green";
    } else if (score <= 5) {
      return "#fada5e";
    } else if (score <= 7.5) {
      return "orange";
    } else if (score <= 10) {
      return "red";
    } else {
      return "darkred";
    }
  };

  const handleBookmark = () => {
    dispatch(postBookmarks(id));
  };

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <View
      className="flex-1"
      style={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <FocusAwareStatusBar style="light" />

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
      <ScrollView
        className="-mt-6 flex-1 rounded-3xl bg-white pt-7"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-2.5 flex-row justify-between px-7">
          {/* Company Name and Category */}
          <View>
            <Text className="text-sm font-bold text-gray-500">{industry}</Text>

            <Text className="pr-6 text-3xl font-bold">{name}</Text>
            {/* Tags */}
            <Text className="mt-1 text-sm font-semibold text-gray-500">
              {esgLevel + " ESG Risk • " + controversyLevel + " Controversy"}
            </Text>
          </View>

          {/* Bookmark Button */}
          <Pressable className="mt-5" onPress={handleBookmark}>
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={30}
              color="black"
            />
          </Pressable>
        </View>

        <ScrollView
          className="mt-3"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginLeft: 25, paddingRight: 55 }}
        >
          {/* ESG */}
          <View
            className="mr-3 h-24 w-32 items-center justify-center rounded-2xl"
            style={{ backgroundColor: esgColor }}
          >
            <Text className="text-sm font-bold text-white">ESG Risk</Text>
            <Text className="mt-0.5 text-5xl font-bold text-white">{esg}</Text>
          </View>
          {/* Environmental */}
          <View
            className="mr-3 h-24 w-32 items-center justify-center rounded-2xl"
            style={{ backgroundColor: scoreColor(esgEnvironment) }}
          >
            <Text className="text-sm font-bold text-white">
              Environment Risk
            </Text>
            <Text className="mt-0.5 text-5xl font-bold text-white">
              {esgEnvironment}
            </Text>
          </View>
          {/* Social */}
          <View
            className="mr-3 h-24 w-32 items-center justify-center rounded-2xl"
            style={{ backgroundColor: scoreColor(esgSocial) }}
          >
            <Text className="text-sm font-bold text-white">Social Risk</Text>
            <Text className="mt-0.5 text-5xl font-bold text-white">
              {esgSocial}
            </Text>
          </View>
          {/* Governance */}
          <View
            className="mr-3 h-24 w-32 items-center justify-center rounded-2xl"
            style={{ backgroundColor: scoreColor(esgGovernance) }}
          >
            <Text className="text-sm font-bold text-white">
              Governance Risk
            </Text>
            <Text className="mt-0.5 text-5xl font-bold text-white">
              {esgGovernance}
            </Text>
          </View>
          {/* Controversy */}
          <View
            className="mr-3 h-24 w-32 items-center justify-center rounded-2xl"
            style={{ backgroundColor: controversyColor }}
          >
            <Text className="text-sm font-bold text-white">Controversy</Text>
            <Text className="mt-0.5 text-5xl font-bold text-white">
              {controversy}
            </Text>
          </View>
        </ScrollView>

        {/* Description */}
        <View className="my-4 mb-16 px-7">
          <Text
            className="text-ellipsis pr-4 text-justify text-gray-500"
            numberOfLines={showDescription ? 0 : 4}
          >
            {description}
          </Text>
          <Pressable className="my-1 items-end" onPress={handleShowDescription}>
            <Text className="text-bold text-ellipsis pr-4 text-gray-800">
              {showDescription ? "Close" : "Show All"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
