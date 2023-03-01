import { useState } from "react";
import { Text, View, Image } from "react-native";
import { FlatList, ScrollView, TextInput, Pressable } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fuse from "fuse.js";

import { COMPANIES } from "../../assets/companyinfo";

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
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
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
      <View className="flex-1">
        {/* Search Phrase Display */}
        <Text className="text-xl font-bold pl-7 mt-7 mb-2.5">
          {search === ""
            ? "All Companies"
            : searchResult.length + " Companies Found"}
        </Text>

        {/* Search Results Display */}
        <View className="flex-1">
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={searchResult}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ComapnyPreview id={item.id} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}
