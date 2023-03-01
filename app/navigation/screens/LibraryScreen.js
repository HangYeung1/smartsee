import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COMPANIES } from "../../assets/companyinfo";
import { RECENTS } from "../../assets/recents";
import { UPDATED } from "../../assets/updated";
import { BOOKMARKED } from "../../assets/bookmarked";
import { ScrollView } from "react-native-gesture-handler";

function ComapnyPreview({ id, name, color, tags, src, navigation }) {
  let tagsDisplay = tags.join(", ");
  if (tagsDisplay.length > 25) {
    tagsDisplay = tagsDisplay.substring(0, 22) + "...";
  }

  return (
    <Pressable
      style={{
        height: 200,
        width: 175,
        margin: 20,
      }}
      onPress={() => navigation.navigate("Breakdown", { id: id })}
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
    </Pressable>
  );
}

export default function LibraryScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  let updatedCompanies = [];
  for (let i = 0; i < UPDATED.length; i++) {
    for (let j = 0; j < COMPANIES.length; j++) {
      if (UPDATED[i] === COMPANIES[j].id) {
        updatedCompanies.push(COMPANIES[j]);
      }
    }
  }

  let recentCompanies = [];
  for (let i = 0; i < RECENTS.length; i++) {
    for (let j = 0; j < COMPANIES.length; j++) {
      if (RECENTS[i] === COMPANIES[j].id) {
        recentCompanies.push(COMPANIES[j]);
      }
    }
  }

  let bookmarkedCompanies = [];
  for (let i = 0; i < BOOKMARKED.length; i++) {
    for (let j = 0; j < COMPANIES.length; j++) {
      if (BOOKMARKED[i] === COMPANIES[j].id) {
        bookmarkedCompanies.push(COMPANIES[j]);
      }
    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 30 + insets.top,
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Library</Text>

        <Pressable>
          <Ionicons name="settings-outline" size={30} color="black" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Just Updated</Text>
          <Ionicons
            name="cloud-upload-outline"
            size={24}
            color="black"
            style={{ paddingLeft: 10 }}
          />
        </View>

        <View>
          <FlatList
            data={updatedCompanies}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ComapnyPreview
                id={item.id}
                name={item.name}
                color={item.color}
                tags={item.tags}
                src={item.src}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <Ionicons
            name="time-outline"
            size={24}
            color="black"
            style={{ paddingLeft: 10 }}
          />
        </View>

        <View>
          <FlatList
            data={recentCompanies}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ComapnyPreview
                id={item.id}
                name={item.name}
                color={item.color}
                tags={item.tags}
                src={item.src}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bookmarks</Text>
          <Ionicons
            name="bookmark-outline"
            size={24}
            color="black"
            style={{ paddingLeft: 10 }}
          />
        </View>

        <View>
          <FlatList
            data={bookmarkedCompanies}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ComapnyPreview
                id={item.id}
                name={item.name}
                color={item.color}
                tags={item.tags}
                src={item.src}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingLeft: 30,
    marginTop: 15,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
