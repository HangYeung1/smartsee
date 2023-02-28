import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COMPANIES } from "../../assets/companyinfo";
import Fuse from "fuse.js";

function ComapnyPreview({ name, color, tags, src }) {
  let tagsDisplay = tags.join(", ");
  if (tagsDisplay.length > 25) {
    tagsDisplay = tagsDisplay.substring(0, 22) + "...";
  }

  return (
    <View
      style={{
        height: 200,
        width: 175,
        margin: 20,
      }}
    >
      <View
        style={{
          shadowColor: "black",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
        }}
      >
        <Image
          source={src}
          style={{
            resizeMode: "cover",
            width: "100%",
            height: 150,
            borderRadius: 10,
          }}
        />
      </View>

      <Text
        style={{ fontSize: 16, color: "black", marginLeft: 2, marginTop: 15 }}
      >
        {name}
      </Text>
      <View
        style={{ flexDirection: "row", marginLeft: 5, alignItems: "center" }}
      >
        <Ionicons
          name="analytics-outline"
          size={18}
          color={color}
          style={{ marginRight: 3 }}
        />
        <Text style={{ fontSize: 12, color: "black" }}>{tagsDisplay}</Text>
      </View>
    </View>
  );
}

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    Clothing: false,
    Electronic: false,
    Food: false,
    Leisure: false,
    Medical: false,
    Sports: false,
    Transportation: false,
    Other: false,
  });
  const insets = useSafeAreaInsets();

  // When search changes, change what companies are displayed + title
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  // // Get filtered companies
  let activeFilters = [];
  for (const key in filter) {
    if (filter[key]) {
      activeFilters.push(key);
    }
  }

  let filteredCompanies = [];
  if (activeFilters.length > 0) {
    for (let i = 0; i < COMPANIES.length; i++) {
      let company = COMPANIES[i];
      if (activeFilters.includes(company.cat)) {
        filteredCompanies.push(company);
      }
    }
  } else {
    filteredCompanies = COMPANIES;
  }

  let searchedComapnies = filteredCompanies;
  if (search !== "") {
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(searchedComapnies, options);
    searchedComapnies = fuse.search(search);
    searchedComapnies = searchedComapnies.map((result) => result.item);
  }

  return (
    <>
      <StatusBar style="auto" />
      <View
        className="titleBar"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          paddingTop: 30 + insets.top,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Search</Text>
        <Pressable>
          <Ionicons name="settings-outline" size={30} color="black" />
        </Pressable>
      </View>
      <View
        className="searchBar"
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F2F2F2",
          marginLeft: 25,
          marginRight: 25,
          borderRadius: 15,
        }}
      >
        <Ionicons
          name="search"
          size={24}
          color="black"
          style={{ paddingLeft: 10 }}
        />
        <TextInput
          value={search}
          onChangeText={handleSearchChange}
          placeholder="What company do you want to look up?"
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#F2F2F2",
            padding: 10,
          }}
        />
      </View>
      <View>
        <ScrollView
          className="filterBtns"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ marginLeft: 25, paddingRight: 25 }}
        >
          <Pressable
            onPress={() => setFilter({ ...filter, Clothing: !filter.Clothing })}
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Clothing ? "mediumseagreen" : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Clothing</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setFilter({ ...filter, Electronic: !filter.Electronic })
            }
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Electronic ? "mediumseagreen" : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Electronic</Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter({ ...filter, Food: !filter.Food })}
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Food ? "mediumseagreen" : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Food</Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter({ ...filter, Leisure: !filter.Leisure })}
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Leisure ? "mediumseagreen" : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Leisure</Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter({ ...filter, Medical: !filter.Medical })}
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Medical ? "mediumseagreen" : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Medical</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setFilter({ ...filter, Necessities: !filter.Necessities })
            }
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Necessities
                  ? "mediumseagreen"
                  : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Necessities</Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter({ ...filter, Sports: !filter.Sports })}
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Sports ? "mediumseagreen" : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Sports</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setFilter({ ...filter, Transportation: !filter.Transportation })
            }
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Transportation
                  ? "mediumseagreen"
                  : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Transportation</Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter({ ...filter, Other: !filter.Other })}
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter.Other ? "mediumseagreen" : "black",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Other</Text>
          </Pressable>
        </ScrollView>
      </View>
      <Text
        style={{
          paddingLeft: 30,
          marginTop: 30,
          marginBottom: 10,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {search === "" ? "All Companies" : "Searching: " + search}
      </Text>
      <FlatList
        data={searchedComapnies}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ComapnyPreview
            name={item.name}
            color={item.color}
            tags={item.tags}
            src={item.src}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  filterBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 5,
    height: 35,
    backgroundColor: "black",
    borderRadius: 20,
  },
});
