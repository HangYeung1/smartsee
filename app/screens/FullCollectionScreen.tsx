import CompanyCard from "../components/CompanyCard";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { selectCompanies } from "../redux/companiesSlice";
import { View, Text, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function FullCollectionScreen({ navigation, route }) {
  const { name, ids } = route.params;

  const insets = useSafeAreaInsets();
  const companies = useSelector(selectCompanies);

  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <FocusAwareStatusBar style="dark" />

      {/* Collection Header */}
      <View className="flex-row items-center justify-between px-8 pb-2.5 pt-8">
        <Text className="text-3xl font-bold">{name}</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="exit-outline" size={30} color="black" />
        </Pressable>
      </View>

      <Text className="mb-2.5  px-8 text-xl font-bold">
        {ids.length + " Companies"}
      </Text>

      {/* Collection Companies */}
      {ids.length !== 0 ? (
        <FlatList
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          data={ids.map((id) => companies.find((company) => company.id === id))}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <CompanyCard company={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View className="m-6 mt-2 flex-1 items-center justify-center rounded-2xl bg-gray-100">
          <Ionicons
            name="file-tray-outline"
            size={100}
            color="rgb(107,114,128)"
          />
          <Text className="text-lg text-gray-500">So empty...</Text>
        </View>
      )}
    </View>
  );
}
