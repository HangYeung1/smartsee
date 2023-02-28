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

function FilterButton({ text, onPress = () => {} }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 5,
        height: 35,
        backgroundColor: "black",
        borderRadius: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 14 }}>{text}</Text>
    </Pressable>
  );
}

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
  const [filter, setFilter] = useState();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (search.length > 0) {
      setFilter(
        COMPANIES.filter((company) =>
          company.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilter();
    }
  });

  useEffect(() => {});

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
          onChangeText={(newSearch) => setSearch(newSearch)}
          placeholder="What company do you want to look up?"
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#F2F2F2",
            padding: 10,
          }}
        />
      </View>
      <View style={{ flexGrow: 1 }}>
        <ScrollView
          className="filterBtns"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ marginLeft: 25 }}
        >
          <FilterButton text="Clothes" />
          <FilterButton text="Electronic" />
          <FilterButton text="Food" />
          <FilterButton text="Leisure" />
          <FilterButton text="Medical" />
          <FilterButton text="Necessities" />
          <FilterButton text="Sports" />
          <FilterButton text="Transportation" />
          <FilterButton text="Other" />
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
        Recents
      </Text>
      <FlatList
        data={COMPANIES}
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

const styles = StyleSheet.create({});
