import { Text, View, Image } from "react-native";
import { Pressable, FlatList } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { COMPANIES } from "../../assets/companyinfo";
const collections = require("../../assets/collections.json");

function ComapnyPreview({ id, navigation }) {
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
      className="h-48 w-44 m-5"
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
        <Image className="h-36 w-44 rounded-2xl" source={src} />
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

export default function LibraryScreen({ navigation }) {
  // Get safe area insets
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
      }}
    >
      <StatusBar style="auto" />

      {/* Library Header */}
      <View className="flex-row items-center justify-between px-8 pt-8 pb-2.5">
        <Text className="text-3xl font-bold">Library</Text>
        <Pressable>
          <Ionicons name="settings-outline" size={30} color="black" />
        </Pressable>
      </View>

      {/* Collections */}
      <FlatList
        style={{ flex: 1 }}
        data={collections}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            {/* Collection Name */}
            <View className="flex-row pl-7 mt-7">
              <Text className="text-xl font-bold mr-2.5">{item.name}</Text>
              <Ionicons name={item.icon} size={24} color="black" />
            </View>

            {/* Collection Companies */}
            <FlatList
              data={COMPANIES.filter((company) =>
                item.list.includes(company.id)
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ComapnyPreview id={item.id} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      >
        keyExtractor = {(item) => item.id}
      </FlatList>
    </View>
  );
}
