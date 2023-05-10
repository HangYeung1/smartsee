import CompanyCard from "../components/CompanyCard";
import { selectCompanies } from "../redux/companiesSlice";
import { selectIndustries } from "../redux/companiesSlice";
import { StatusBar } from "expo-status-bar";
import Fuse from "fuse.js";
import { useState, useEffect } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
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

const { Popover } = renderers;

export default function SearchScreen({ navigation }) {
  // State
  const [search, setSearch] = useState<string>("");
  const [searchMode, setSearchMode] = useState<string>("");
  const [activeIndustries, setActiveIndustries] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState([]);

  // Hooks
  const insets: EdgeInsets = useSafeAreaInsets();
  const companies = useSelector(selectCompanies);
  const industries = useSelector(selectIndustries);

  useEffect(() => {
    // When company filter changes, change what companies are displayed
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

    // Search mode
    switch (searchMode) {
      case "Best Match":
        break;
      case "Recently Updated":
        filteredCompanies.sort((a, b) => {
          return b.lastUpdated - a.lastUpdated;
        });
        break;
      case "Oldest Updated":
        filteredCompanies.sort((a, b) => {
          return a.lastUpdated - b.lastUpdated;
        });
        break;
      case "Name Ascending":
        filteredCompanies.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "Name Descending":
        filteredCompanies.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      default:
        break;
    }

    setSearchResults(filteredCompanies);
  }, [search, activeIndustries, searchMode]);

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

  // Search mode buttons
  const searchModeButtons = () => {
    const buttons: string[] = [
      "Best Match",
      "Recently Updated",
      "Oldest Updated",
      "Name Ascending",
      "Name Descending",
    ];
    return buttons.map((button) => (
      <MenuOption
        onSelect={() => {
          setSearchMode(button);
        }}
        key={button}
      >
        <Text className="text-base">
          {button === searchMode ? button + " ✓" : button}
        </Text>
      </MenuOption>
    ));
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
      <StatusBar style="auto" />

      {/* Search Header */}
      <View>
        {/* Page Title */}
        <View className="flex-row items-center justify-between px-8 pb-2.5 pt-8">
          <Text className="text-3xl font-bold">Search</Text>
          <Menu renderer={Popover} rendererProps={{ placement: "bottom" }}>
            <MenuTrigger
              children={
                <Ionicons name="filter-outline" size={30} color="black" />
              }
            />
            <MenuOptions
              customStyles={{
                optionsWrapper: { padding: 10 },
                optionsContainer: { borderRadius: 10 },
              }}
            >
              {searchModeButtons()}
            </MenuOptions>
          </Menu>
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
          {industries.map((industryObj) => (
            <Pressable
              className="mr-1.5 items-center justify-center rounded-full bg-black"
              key={industryObj.name}
              onPress={() => handleFilterChange(industryObj.name)}
              style={[
                {
                  backgroundColor: activeIndustries.includes(industryObj.name)
                    ? "mediumseagreen"
                    : "black",
                },
              ]}
            >
              <Text className="mx-5 my-2 text-sm text-white ">
                {industryObj.name}
              </Text>
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
            : searchResults.length + " Companies Found"}
        </Text>

        {/* Search Results Display */}
        <View className="flex-1">
          <FlatList
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            data={searchResults}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CompanyCard company={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}
