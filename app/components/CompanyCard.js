import { View, Pressable, Text, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { COMPANIES } from "../assets/dummy-data/companies";

export default function CompanyCard({ id, navigation }) {
  // Get company info
  const { name, src, tags, color } = COMPANIES.find(
    (company) => company.id === id
  );

  // Format tags
  let tagsDisplay = tags.join(", ");
  if (tagsDisplay.length > 25) {
    tagsDisplay = tagsDisplay.substring(0, 22) + "...";
  }

  return (
    <Pressable
      className="w-44 m-4"
      onPress={() => navigation.navigate("Breakdown", { id: id })}
    >
      {/* Company Image */}
      <View
        style={{
          shadowColor: "black",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
        }}
      >
        <Image className="h-36 w-full rounded-2xl" source={src} />
      </View>

      {/* Company Name and Tags */}
      <Text className="text-base ml-0.5 mt-3.5">{name}</Text>
      <View className="flex-row items-center ml-1">
        <Ionicons name="analytics-outline" size={18} color={color} />
        <Text className="text-xs ml-0.5">{tagsDisplay}</Text>
      </View>
    </Pressable>
  );
}
