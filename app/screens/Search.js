import { useState } from "react";
import { Text, View, Image } from "react-native";
import { FlatList, ScrollView, TextInput, Pressable } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fuse from "fuse.js";

import CompanyCard from "../components/CompanyCard";
import { COMPANIES } from "../assets/dummy-data/companies";

export default function SearchScreen({ navigation }) {
  // Search state
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  // Get safe area insets
  const insets = useSafeAreaInsets();

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
  const handleFilterChange = (change) => {
    if (!activeFilters.includes(change)) {
      setActiveFilters([...activeFilters, change]);
    } else {
      setActiveFilters(activeFilters.filter((category) => category !== change));
    }
  };

  // Handle search changes
  const handleSearchChange = (newSearch) => {
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
        <View className="flex-row items-center bg-gray-100 mx-6 px-2.5 rounded-2xl">
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            className="w-4/5 h-12 ml-2.5"
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
              className="justify-center items-center mr-1.5 bg-black rounded-full"
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
              <Text className="text-white text-sm mx-5 my-2 ">
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Search Results */}
      <View className="flex-1 justify-center">
        {/* Search Phrase Display */}
        <Text className="text-xl font-bold pl-7 mt-7 mb-2.5">
          {search === ""
            ? "All Companies"
            : searchResult.length + " Companies Found"}
        </Text>

        {/* Search Results Display */}
        <View className="flex-1">
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
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}
