import { Text, View, Image } from "react-native";
import { Pressable, FlatList } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import CompanyCard from "../components/CompanyCard";
import { COMPANIES } from "../assets/dummy-data/companies";
const collections = require("../assets/dummy-data/collections.json");

export default function LibraryScreen({ navigation }) {
  // Get safe area insets
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
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
                <CompanyCard id={item.id} navigation={navigation} />
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
