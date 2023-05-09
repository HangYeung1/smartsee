import CompanyCard from "../components/CompanyCard";
import { selectCompanies } from "../redux/companiesSlice";
import { selectCollections } from "../redux/userSlice";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

function CollectionCarousel({ navigation, collection, name, icon }) {
  const companies = useSelector(selectCompanies);

  // Don't render if collection is empty
  if (collection.length === 0) {
    return null;
  }

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
    </View>
  );
}

export default function LibraryScreen({ navigation }) {
  // Hooks
  const insets: EdgeInsets = useSafeAreaInsets();
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
          collection={[...collections.justUpdated]}
          name="Just Updated"
          icon="cloud-upload-outline"
        />
        {/* Recently Viewed Collection */}
        <CollectionCarousel
          navigation={navigation}
          collection={[...collections.recentlyViewed]}
          name="Recently Viewed"
          icon="time-outline"
        />
        {/* Bookmarks Collection */}
        <CollectionCarousel
          navigation={navigation}
          collection={[...collections.bookmarks]}
          name="Bookmarks"
          icon="bookmark-outline"
        />
      </ScrollView>
    </View>
  );
}
