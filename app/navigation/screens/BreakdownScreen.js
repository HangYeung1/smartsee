import { StyleSheet, Text, View, Pressable, Image } from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { COMPANIES } from "../../assets/companyinfo";

export default function BreakdownScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();

  const { id } = route.params;
  const company = COMPANIES.find((company) => company.id === id);

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
      <Image className="w-full h-2/5" source={company.src} blurRadius={5} />

      {/* Gradient Overlay */}
      <LinearGradient
        className="absolute w-full h-36"
        colors={["rgba(0,0,0,0.8)", "transparent"]}
      />

      {/* Back Button */}
      <Pressable
        className="absolute left-5"
        style={{ top: insets.top + 30 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={35} color="white" />
      </Pressable>

      {/* Company Info */}
      <View className="flex-1 -mt-6 px-7 pt-7 rounded-3xl bg-white" style={{}}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2.5">
          {/* Company Name and Category */}
          <View>
            <Text className="text-sm font-bold text-gray-500">
              {company.category}
            </Text>
            <Text className="text-3xl font-bold">{company.name}</Text>
          </View>

          {/* Bookmark Button */}
          <Pressable>
            <Ionicons name="bookmark-outline" size={30} color="black" />
          </Pressable>
        </View>

        {/* Tags */}
        <Text className="text-sm text-gray-500">
          {company.tags.join(" • ")}
        </Text>

        {/* Detail Breakdown */}
        <View className="flex-row my-4">
          {/* Icon */}
          <View className="justify-center items-center h-10 w-10 bg-gray-100 rounded-full">
            <Ionicons name="analytics-outline" size={30} color="black" />
          </View>

          {/* Text */}
          <View className="ml-3.5">
            <Text className="font-bold text-xl">Title</Text>
            <Text className="text-gray-500">Subtitle</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
