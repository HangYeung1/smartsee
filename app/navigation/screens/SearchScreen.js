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
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COMPANIES } from "../../assets/companyinfo";

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
  const [filter, setFilter] = useState(Array(10).fill(false));
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
        <Text
          style={{
            paddingLeft: 30,
            marginTop: 30,
            paddingBottom: 10,
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
          contentContainerStyle={{ height: 980 }}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
