import { COMPANIES } from "../assets/dummy-data/companies";
import CompanyCard from "../components/CompanyCard";
import { StatusBar } from "expo-status-bar";
import Fuse from "fuse.js";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SearchScreen({ navigation }) {
  // Search state
  const [search, setSearch] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Get safe area insets
  const insets: EdgeInsets = useSafeAreaInsets();

  // Categories
  const categories = [
    { name: "Clothing", id: 0 },
    { name: "Electronic", id: 1 },
    { name: "Food", id: 2 },
    { name: "Leisure", id: 3 },
    { name: "Medical", id: 4 },
    { name: "Necessities", id: 5 },
    { name: "Sports", id: 6 },
    { name: "Transportation", id: 7 },
    { name: "Other", id: 8 },
  ];

  // Handle filter changes
  const handleFilterChange = (change: string) => {
    if (!activeFilters.includes(change)) {
      setActiveFilters([...activeFilters, change]);
    } else {
      setActiveFilters(activeFilters.filter((category) => category !== change));
    }
  };

  // Handle search changes
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  // When filter changes, change what companies are displayed
  let searchResult = [];
  if (activeFilters.length > 0) {
    searchResult = COMPANIES.filter((company) =>
      activeFilters.includes(company.category)
    );
  } else {
    searchResult = COMPANIES;
  }

  // When search changes, change what companies are displayed
  if (search !== "") {
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(searchResult, options);
    searchResult = fuse.search(search);
    searchResult = searchResult.map((result) => result.item);
  }

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

      {/* Search Header */}
      <View>
        {/* Page Title */}
        <View className="flex-row items-center justify-between px-8 pt-8 pb-2.5">
          <Text className="text-3xl font-bold">Search</Text>
          <Pressable>
            <Ionicons name="settings-outline" size={30} color="black" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="mx-6 flex-row items-center rounded-2xl bg-gray-100 px-2.5">
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            className="ml-2.5 h-12 w-4/5"
            value={search}
            onChangeText={handleSearchChange}
            placeholder="What company do you want to look up?"
          />
        </View>

        {/* Search Filters */}
        <ScrollView
          className="mt-2.5"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginLeft: 25, paddingRight: 50 }}
        >
          {categories.map((category) => (
            <Pressable
              className="mr-1.5 items-center justify-center rounded-full bg-black"
              key={category.id}
              onPress={() => handleFilterChange(category.name)}
              style={[
                {
                  backgroundColor: activeFilters.includes(category.name)
                    ? "mediumseagreen"
                    : "black",
                },
              ]}
            >
              <Text className="mx-5 my-2 text-sm text-white ">
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Search Results */}
      <View className="flex-1 justify-center">
        {/* Search Phrase Display */}
        <Text className="mt-7 mb-2.5 pl-7 text-xl font-bold">
          {search === ""
            ? "All Companies"
            : searchResult.length + " Companies Found"}
        </Text>

        {/* Search Results Display */}
        <View
          className="flex-1"
          style={{
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
          }}
        >
          <FlatList
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            data={searchResult}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CompanyCard id={item.id} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}
