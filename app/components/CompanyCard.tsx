import { COMPANIES } from "../assets/dummy-data/companies";
import { Image, Pressable, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CompanyCard({ id, navigation }) {
  // Get company info
  const { name, src, tags, color } = COMPANIES.find(
    (company) => company.id === id
  );

  // Format tags
  let tagsDisplay: string = tags.join(", ");
  if (tagsDisplay.length > 25) {
    tagsDisplay = tagsDisplay.substring(0, 22) + "...";
  }

  return (
    <Pressable
      className="m-4 w-44"
      onPress={() => navigation.navigate("Breakdown", { id: id })}
    >
      {/* Company Image */}
      <Image className="h-36 w-full rounded-2xl" source={src} />

      {/* Company Name and Tags */}
      <Text className="ml-0.5 mt-3.5 text-base">{name}</Text>
      <View className="ml-1 flex-row items-center">
        <Ionicons name="analytics-outline" size={18} color={color} />
        <Text className="ml-0.5 text-xs">{tagsDisplay}</Text>
      </View>
    </Pressable>
  );
}
