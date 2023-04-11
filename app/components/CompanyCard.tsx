import { Image, Pressable, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CompanyCard({ company, navigation }) {
  // Get company info
  const { name, description, esg, imageURL, id } = company;

  // Get color from esg
  let color;
  if (esg <= 10) {
    color = "green";
  } else if (esg <= 20) {
    color = "#fada5e";
  } else if (esg <= 30) {
    color = "orange";
  } else if (esg <= 40) {
    color = "red";
  } else {
    color = "darkred";
  }

  return (
    <Pressable
      className="m-4 w-44"
      onPress={() =>
        navigation.navigate("BreakdownScreen", { company: company })
      }
    >
      {/* Company Image */}
      <View
        className="h-36 w-full items-center justify-center rounded-2xl bg-white"
        style={{
          shadowColor: "black",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
        }}
      >
        <Image
          className="h-4/5 w-4/5 rounded-2xl"
          style={{ resizeMode: "contain" }}
          source={{ uri: imageURL }}
        />
      </View>

      {/* Company Name and Tags */}
      <Text className="mx-0.5 mt-3.5 truncate text-base" numberOfLines={1}>
        {name}
      </Text>
      <View className="ml-1 flex-row items-center">
        <Ionicons name="analytics-outline" size={18} color={color} />
        <Text className="ml-0.5 mr-5 text-ellipsis text-xs" numberOfLines={1}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
}
