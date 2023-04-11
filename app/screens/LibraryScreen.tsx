import CompanyCard from "../components/CompanyCard";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { useCompanies } from "../hooks/useCompanies";
import { StatusBar } from "expo-status-bar";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  const [companies] = useCompanies();
  const [collections, setCollections] = useState<any>({
    "Recently Viewed": [],
    Bookmarks: [],
    _icons: {},
    _order: [],
  });

  // Fetch user collections
  useEffect(() => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const getCollections = async () => {
      try {
        const data: any = await getDoc(userDoc);
        const userCollections = data.data().collections;
        setCollections(userCollections);
        console.log("Collections fetched successfully!");
      } catch (err) {
        console.error(err);
      }
    };
    getCollections();
  }, []);

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
            collections["Recently Viewed"].includes(company.id)
          )}
          name="Recently Viewed"
          icon="time-outline"
        />
        {/* Bookmarks Collection */}
        <CollectionCarousel
          navigation={navigation}
          data={companies.filter((company) =>
            collections["Bookmarks"].includes(company.id)
          )}
          name="Bookmarks"
          icon="bookmark-outline"
        />
      </ScrollView>
    </View>
  );
}
