import CompanyCard from "../components/CompanyCard";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { selectCompanies } from "../redux/companiesSlice";
import { AppDispatch } from "../redux/store";
import { postDisplayMode, selectCollections } from "../redux/userSlice";
import { selectDisplayMode } from "../redux/userSlice";
import { FlatList, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const { Popover } = renderers;

export default function LibraryScreen({ navigation }) {
  // Hooks
  const insets: EdgeInsets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const displayMode = useSelector(selectDisplayMode);
  const companies = useSelector(selectCompanies);
  const collections = useSelector(selectCollections);

  const displayModeButtons = () => {
    const collectionNames = ["Just Updated", "Recently Viewed", "Bookmarks"];
    return collectionNames.map((collectionName) => (
      <MenuOption
        onSelect={() => {
          dispatch(postDisplayMode(collectionName));
        }}
        key={collectionName}
      >
        <Text className="text-base">
          {displayMode[collectionName] ? collectionName + " ✓" : collectionName}
        </Text>
      </MenuOption>
    ));
  };

  const collectionCarousel = (collection, name, icon) => {
    return (
      <View>
        {/* Collection Name */}
        <View className="mt-7 flex-row items-center justify-between px-7">
          <View className="flex-row">
            <Text className="mr-2.5 text-xl font-bold">{name}</Text>
            <Ionicons name={icon} size={24} color="black" />
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate("FullCollectionScreen", {
                ids: collection,
                name: name,
              })
            }
          >
            <View className="flex-row items-center">
              <Text className="ml-2.5 text-sm text-gray-500">See All</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={16}
                color="rgb(107,114,128)"
              />
            </View>
          </Pressable>
        </View>
        {/* Collection Companies */}
        {collection.length !== 0 ? (
          <FlatList
            data={collection.map((id) =>
              companies.find((company) => company.id === id)
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CompanyCard company={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View className="mx-5 mb-5 mt-4 h-44 items-center justify-center rounded-3xl bg-gray-100">
            <Text className="text-lg text-gray-500">Add a few companies!</Text>
          </View>
        )}
      </View>
    );
  };

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

      {/* Library Header */}
      <View className="flex-row items-center justify-between px-8 pb-2.5 pt-8">
        <Text className="text-3xl font-bold">Library</Text>
        <Menu renderer={Popover} rendererProps={{ placement: "bottom" }}>
          <MenuTrigger
            children={
              <Ionicons name="create-outline" size={30} color="black" />
            }
            customStyles={{
              TriggerTouchableComponent: Pressable,
            }}
          />
          <MenuOptions
            customStyles={{
              optionsWrapper: { padding: 10 },
              optionsContainer: { borderRadius: 10 },
            }}
          >
            {displayModeButtons()}
          </MenuOptions>
        </Menu>
      </View>

      {/* Collections */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Just Updated Collection */}
        {displayMode["Just Updated"] &&
          collectionCarousel(
            collections.justUpdated,
            "Just Updated",
            "cloud-upload-outline"
          )}
        {/* Recently Viewed Collection */}
        {displayMode["Recently Viewed"] &&
          collectionCarousel(
            collections.recentlyViewed,
            "Recently Viewed",
            "time-outline"
          )}
        {/* Bookmarks Collection */}
        {displayMode["Bookmarks"] &&
          collectionCarousel(
            collections.bookmarks,
            "Bookmarks",
            "bookmark-outline"
          )}
      </ScrollView>
    </View>
  );
}
