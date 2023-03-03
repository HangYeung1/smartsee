import { COMPANIES } from "../assets/dummy-data/companies";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <Image className="h-2/5 w-full" source={company.src} blurRadius={5} />

      {/* Gradient Overlay */}
      <LinearGradient
        className="absolute h-36 w-full"
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
      <View className="-mt-6 flex-1  rounded-3xl bg-white px-7 pt-7" style={{}}>
        {/* Header */}
        <View className="mb-2.5 flex-row items-center justify-between">
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
        <View className="my-4 flex-row">
          {/* Icon */}
          <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Ionicons name="analytics-outline" size={30} color="black" />
          </View>

          {/* Text */}
          <View className="ml-3.5">
            <Text className="text-xl font-bold">Title</Text>
            <Text className="text-gray-500">Subtitle</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
