import CompanyCard from "../components/CompanyCard";
import { selectCompanies } from "../redux/companiesSlice";
import { selectCollections } from "../redux/userSlice";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

function CollectionCarousel({ navigation, data, name, icon }) {
  return (
    <View>
      {/* Collection Name */}
      <View className="mt-7 flex-row pl-7">
        <Text className="mr-2.5 text-xl font-bold">{name}</Text>
        <Ionicons name={icon} size={24} color="black" />
      </View>
      {/* Collection Companies */}
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CompanyCard company={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default function LibraryScreen({ navigation }) {
  // Hooks
  const insets: EdgeInsets = useSafeAreaInsets();
  const companies = useSelector(selectCompanies);
  const collections = useSelector(selectCollections);

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
      <View className="flex-row items-center justify-between px-8 pb-2.5 pt-8">
        <Text className="text-3xl font-bold">Library</Text>
        <Pressable>
          <Ionicons name="create-outline" size={30} color="black" />
        </Pressable>
      </View>

      {/* Collections */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Just Updated Collection */}
        <CollectionCarousel
          navigation={navigation}
          data={companies
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .slice(0, 10)}
          name="Just Updated"
          icon="cloud-upload-outline"
        />
        {/* Recently Viewed Collection */}
        <CollectionCarousel
          navigation={navigation}
          data={companies.filter((company) =>
            collections.recentlyViewed.includes(company.id)
          )}
          name="Recently Viewed"
          icon="time-outline"
        />
        {/* Bookmarks Collection */}
        <CollectionCarousel
          navigation={navigation}
          data={companies.filter((company) =>
            collections.bookmarks.includes(company.id)
          )}
          name="Bookmarks"
          icon="bookmark-outline"
        />
      </ScrollView>
    </View>
  );
}
