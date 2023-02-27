import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

function FilterButton({ text, onPress = () => {} }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "black",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 5,
      }}
    >
      <Text style={{ color: "white", fontSize: 14 }}>{text}</Text>
    </Pressable>
  );
}

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="auto" />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 30,
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
        <ScrollView
          horizontal="true"
          bounces="false"
          showsHorizontalScrollIndicator="false"
          contentContainerStyle={{
            flexDirection: "row",
            marginLeft: 25,
            marginTop: 10,
            width: 940,
          }}
        >
          <FilterButton text="Clothes" />
          <FilterButton text="Electronic" />
          <FilterButton text="Food" />
          <FilterButton text="Leisure" />
          <FilterButton text="Medical" />
          <FilterButton text="Necessities" />
          <FilterButton text="Other" />
          <FilterButton text="Sports" />
          <FilterButton text="Transportation" />
        </ScrollView>
      </View>
      <View>
        <Text>Recents</Text>
        <FlatList></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  body: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
