import CompanyCard from "../components/CompanyCard";
import { useCompanies } from "../hooks/useCompanies";
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
  // State
  const [search, setSearch] = useState<string>("");
  const [activeIndustries, setActiveIndustries] = useState<string[]>([]);

  // Hooks
  const [companies, industries] = useCompanies();
  const insets: EdgeInsets = useSafeAreaInsets();

  // Handle filter changes
  const handleFilterChange = (change: string) => {
    if (!activeIndustries.includes(change)) {
      setActiveIndustries([...activeIndustries, change]);
    } else {
      setActiveIndustries(
        activeIndustries.filter((industry) => industry !== change)
      );
    }
  };

  // Handle search changes
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  // When filter changes, change what companies are displayed
  let filteredCompanies = JSON.parse(JSON.stringify(companies));
  if (activeIndustries.length > 0) {
    filteredCompanies = filteredCompanies.filter((company) =>
      activeIndustries.includes(company.industry)
    );
  }

  // When search changes, change what companies are displayed
  if (search !== "") {
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(filteredCompanies, options);
    filteredCompanies = fuse.search(search);
    filteredCompanies = filteredCompanies.map((result) => result.item);
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
        <View className="flex-row items-center justify-between px-8 pb-2.5 pt-8">
          <Text className="text-3xl font-bold">Search</Text>
          <Pressable>
            <Ionicons name="filter-outline" size={30} color="black" />
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

        {/* Industry Filter Buttons */}
        <ScrollView
          className="mt-2.5"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginLeft: 25, paddingRight: 40 }}
        >
          {/* Button for Each Industry */}
          {industries.map((industry) => (
            <Pressable
              className="mr-1.5 items-center justify-center rounded-full bg-black"
              key={industries.indexOf(industry)}
              onPress={() => handleFilterChange(industry)}
              style={[
                {
                  backgroundColor: activeIndustries.includes(industry)
                    ? "mediumseagreen"
                    : "black",
                },
              ]}
            >
              <Text className="mx-5 my-2 text-sm text-white ">{industry}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Search Results */}
      <View className="flex-1 justify-center">
        {/* Number of Results Display */}
        <Text className="mb-2.5 mt-7 pl-7 text-xl font-bold">
          {search === ""
            ? "All Companies"
            : filteredCompanies.length + " Companies Found"}
        </Text>

        {/* Search Results Display */}
        <View className="flex-1">
          <FlatList
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            data={filteredCompanies}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CompanyCard company={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}
